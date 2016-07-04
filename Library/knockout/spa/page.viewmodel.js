// Page view model
// ---------------------------------

(function($, utils) {
    gsoft.spa.viewModel = {
        // summary:
        //         When defined, the function will be called before applying the bindings.
        // returns:
        //         void or a jQuery promise.
        _beforeBind: null,
        
        // summary:
        //         When defined, the function will be called after the bindings are applyied.
        _afterBind: null,
        
        // summary:
        //         Bind the view model to the specified @element. This function is automatically called by the SPA
        //         when the route associated to the view model is entered.
        // description:
        //         If the "_beforeBind" function is defined, it will be called before applying the bindings.
        //         If the "_afterBind" function is defined, it will be called after ther binding are applyied.
        // element: DOM element
        //         The element to bind the view model to.
        // returns:
        //         A jQuery promise.
        bind: function(element) {
            gsoft.ensure(element, "element", "viewModel.bind").isDomElement();
            
            this._element = element;

            if (utils.isFunction(this._beforeBind)) {
                var promise = this._beforeBind.call(this);
                
                if (utils.spa._isjQueryPromise(promise)) {
                    var that = this;
                    
                    promise.done(function() {
                        that._applyBindings();
                    });
                    
                    return promise;
                }
            }
            
            this._applyBindings();
            
            return this._createResolvingPromise();
        },
        
        _applyBindings: function() {
            ko.applyBindings(this, this._element);
            
            if (utils.isFunction(this._afterBind)) {
                this._afterBind.call(this);
            }
        },
        
        _createResolvingPromise: function() {
            var deferred = new $.Deferred();
            deferred.resolve();
            
            return deferred.promise();
        },
        
        // summary:
        //         Validate if the view model can be disposed. When defined, this function is automatically called by the SPA
        //         when the route associated to the view model is exited.  
        // description:
        //         If true is returned, the route will be exited.
        //         If false is returned, the route will not be exited.
        //         If a promise is returned
        //              - when the promise is successfully resolved, the route will be exited.
        //              - when the promise fail, the route will not be exited.
        // returns:
        //         A boolean or a jQuery promise.
        canDispose: null,
        
        // summary:
        //         Dispose the view model resources. When defined, this function is automatically called by the SPA
        //         when the route associated to the view model is exited.
        dispose: null
    };
})(jQuery,
   gsoft.utils);