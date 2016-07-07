// Composite ViewModel binder
// ---------------------------------

(function($, utils, undefined) {
    // summary:
    //         A view model binder handling routes that contains multiple KO view models.
    // bindings: Array
    //         An array of bindings.
    spa.CompositeViewModelBinder = function(bindings) {
        gsoft.ensure(bindings, "bindings", "CompositeViewModelBinder.ctor").isArray().isNotEmpty();

        bindings.forEach(function(binding) {
            spa.ensure(binding)._isBinding("CompositeViewModelBinder.ctor - \"bindings\" array contains at least an invalid binding.");
        });

        this._element = null;
        this._bindings = bindings;
        this._isBound = false;
    };

    spa.CompositeViewModelBinder.prototype = $.extend({}, spa.ViewModelBinder, {
        // summary:
        //         Bind the KO view models.
        // element: jQuery element
        //         An element to bind the @viewModel to.
        // parameters: Object
        //         An objet thats contains parameters for the view model factory.
        // returns:
        //         A jQuery promise.
        bind: function(element, parameters) {
            gsoft.ensure(element, "element", "CompositeViewModelBinder.bind").isDomElement();

            this._element = element;

            var that = this;
            var deferred = $.Deferred();
            var bindingPromises = this._applyBindings(element, parameters);

            function whenDone() {
                that._isBound = true;

                deferred.resolveWith(that, [that.bindings]);
            }

            function whenFail() {
                deferred.rejectWith(that, [that.bindings]);
                
                // Handle failure.
                that._onBindingFailed();
            }

            $.when.apply($, bindingPromises).done(whenDone).fail(whenFail);

            return deferred.promise();
        },

        // summary:
        //         Unbind KO the view models.
        // description:
        //         Unbind the view models by cleaning the DOM elements from their KO bindings
        //         and calling the dispose function on every view models.
        unbind: function() {
            var that = this;
            
            return this._tryClearBindings(function() {
                that._clearBindings(that._element);
                
                that._isBound = false;
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

        _applyBindings: function(element, parameters) {
            var bindingPromises = [];
            
            this._bindings.forEach(function(binding) {
                // Augments the binding with the resolved view model for further used.
                binding.viewModel = this._getViewModel(binding.viewModelFactory, parameters, element);

                var bindingElement = this._getBindingElement(binding.bindingElementAccessor, element);
                var bindingPromise = this._bindViewModel(binding.viewModel, bindingElement);
                    
                spa.ensure(bindingPromise)._isjQueryPromise("CompositeViewModelBinder._applyBindings - View model \"bind\" function must return a jQuery promise.");
                bindingPromises.push(bindingPromise);
            }, this);

            return bindingPromises;
        },

        _getBindingElement: function(bindingElementAccessor, containerElement) {
            var bindingElement = bindingElementAccessor(containerElement);
                
            if (utils.isNull(bindingElement)) {
                throw new gsoft.InvalidOperationError("CompositeViewModelBinder._getBindingElement - Binding accessor must return valid element.");
            }

            return bindingElement;
        },

        _bindViewModel: function(viewModel, element) {
            this._cleanElement(element);

            return viewModel.bind(element);
        },

        _tryClearBindings: function(clearBindings) {
            var result = this._evaluateIfViewModelsCanBeDisposed(this._bindings);
            
            if (result.cannotDisposeAllViewModels()) {
                return false;
            }
            
            if (result.hasAsynchronousCanDisposeEvaluation()) {
                return $.when.apply($, result.canDisposePromises).done(function() {
                    // All the promises resolved successfully, all the view models can be disposed, we can clear the bindings.
                    // Otherwise, we do not clear any bindings.
                    clearBindings();
                });
            }
            
            // All the view models that had the "canDispose" function defined, returned true, we can clear the bindings.
            clearBindings();
        
            if (result.canDisposeFunctionIsNotImplementedOnAnyViewModels()) {
                return undefined;
            }

            return true;
        },
        
        _evaluateIfViewModelsCanBeDisposed: function(bindings) {
            var that = this;
            var canDisposePromises = [];
            var unimplementedCount = 0;
            
            // If at least one view model that implements the "canDispose" function returned false, 
            // none of the bindings can be cleared.
            var canDisposeAllViewModels = bindings.every(function(binding) {
                if (utils.isFunction(binding.viewModel.canDispose)) {
                    var result = binding.viewModel.canDispose();

                    if (utils.isBoolean(result)) {
                        if (result === false) {
                            // Break the loop.
                            return false;
                        }
                    } else if (spa.utils._isjQueryPromise(result)) {
                        canDisposePromises.push(result);
                    } else {
                        throw new gsoft.InvalidOperationError("CompositeViewModelBinder.unbind - The \"canDispose\" function must return a boolean value or a jQuery promise.");
                    }
                } else {
                    unimplementedCount += 1;
                }
                
                // Evaluate next binding if any.
                return true;
            }, this);
            
            return {
                cannotDisposeAllViewModels: function() {
                    return canDisposeAllViewModels === false;
                },
                canDisposeFunctionIsNotImplementedOnAnyViewModels: function() {
                    return unimplementedCount === that._bindings.length;
                },
                hasAsynchronousCanDisposeEvaluation: function() {
                    return canDisposePromises.length > 0;
                },
                canDisposePromises: canDisposePromises
            };
        },
        
        _clearBindings: function(element) {
            this._bindings.forEach(function(binding) {
                var bindingElement = this._getBindingElement(binding.bindingElementAccessor, element);

                if (!utils.isNull(bindingElement)) {
                    this._cleanElement(bindingElement);
                }
               
                this._disposeViewModel(binding.viewModel);
            }, this);
        },
        
        _onBindingFailed: function() {
            utils.trace("[SHELL] An error occured while binding a view model to a view with the CompositeViewModelBinder");

            spa.shell.publishError(
                spa.Component.CompositeViewModelBinder,
                "BindingFailed");
        }
    });
})(jQuery, 
   gsoft.utils);