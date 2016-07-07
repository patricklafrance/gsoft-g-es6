// Service registry
// ---------------------------------

(function(ensure, utils) {
    gsoft.spa.serviceRegistry = {
        _services: {},

        add: function(name, factory) {
            ensure(name, "name", "ServiceRegistry.add").isNotNullOrEmpty();
            ensure(factory, "factory", "ServiceRegistry.add").isFunction();
            
            this._services[name] = factory;
        },

        find: function(name) {
            ensure(name, "name", "ServiceRegistry.add").isNotNullOrEmpty();
            
            if (utils.isUndefined(this._services[name])) {
                return null;
            }
            
            return this._services[name];
        }
    };
})(gsoft.ensure,
   gsoft.utils);