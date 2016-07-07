// Single ViewModel binder
// ---------------------------------

(function($, utils, undefined) {
    // summary:
    //         A view model binder that handle routes with a single view model.
    // viewModelFactory: Function
    //         A function that returns a KO view model to bind.
    spa.SimpleViewModelBinder = function(viewModelFactory) {
        gsoft.ensure(viewModelFactory, "viewModelFactory", "SimpleViewModelBinder.ctor").isFunction();

        this._element = null;
        this._viewModel = null;
        this._viewModelFactory = viewModelFactory;
        this._isBound = false;
    };

    spa.SimpleViewModelBinder.prototype = $.extend({}, spa.ViewModelBinder, {
        // summary:
        //         Bind the KO view model.
        // element: jQuery element
        //         An element to bind the @viewModel to.
        // parameters: Object
        //         An objet thats contains parameters for the view model factory.
        // returns:
        //         A jQuery promise.
        bind: function(element, parameters) {
            gsoft.ensure(element, "element", "SimpleViewModelBinder.bind").isDomElement();

            this._viewModel = this._getViewModel(this._viewModelFactory, parameters, element);
            this._element = element;

            var that = this;
            var deferred = $.Deferred();
            var bindingPromise = this._bindViewModel(this._viewModel, element);

            spa.ensure(bindingPromise)._isjQueryPromise("SimpleViewModelBinder.bind - View model \"bind\" function must return a jQuery promise.");

            bindingPromise.done(function() {
                that._isBound = true;

                deferred.resolveWith(that, [that._viewModel, element]);
            });

            bindingPromise.fail(function() {
                deferred.rejectWith(that, [that._viewModel, element]);

                // Handle failure.
                that._onBindingFailed();
            });
            
            return deferred.promise();
        },

        // summary:
        //         Unbind the KO view model.
        // description:
        //         Unbind the view model by cleaning the DOM element from his KO bindings
        //         and call the dispose function on the view model.
        unbind: function() {
            var that = this;

            return this._tryDisposeViewModel(function() {
                that._disposeViewModel(that._viewModel);
                
                that._isBound = false;

                that._cleanElement(that._element);
                that._element = null;
            });
        },

        // summary:
        //         Indicate if the view model is bound to the view.
        // returns:
        //         A boolean.
        isBound: function() {
            return this._isBound;
        },
    
        _bindViewModel: function(viewModel, element) {
            this._cleanElement(element);

            return viewModel.bind(element);
        },
        
        _tryDisposeViewModel: function(disposeViewModel) {
            if (utils.isFunction(this._viewModel.canDispose)) {
                var result = this._viewModel.canDispose();
                
                if (utils.isBoolean(result)) {
                    if (result === true) {
                        disposeViewModel();
                    }
                    
                    return result;
                } 
                
                if (spa.utils._isjQueryPromise(result)) {
                    result.done(function() {
                        disposeViewModel();
                    });
                    
                    return result;
                }
                
                throw new gsoft.InvalidOperationError("SimpleViewModelBinder.unbind - The \"canDispose\" function must return a boolean value or a jQuery promise.");
            }
            
            disposeViewModel();
            
            return undefined;
        },

        _onBindingFailed: function() {
            utils.trace("[SHELL] An error occured while binding a view model to a view with the SimpleViewModelBinder");

            spa.shell.publishError(
                spa.Component.SimpleViewModelBinder, 
                "BindingFailed");
        }
    });
})(jQuery,
   gsoft.utils);