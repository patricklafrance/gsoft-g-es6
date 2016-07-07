// Route registry
// ---------------------------------

(function(utils) {
    spa.routeRegistry = {
        _routes: {},

        add: function(name, url) {
            var route = new spa.Route(name, url);

            this._routes[name] = route;
        },

        find: function(name) {
            gsoft.ensure(name, "name", "RouteRegistry.add").isNotNullOrEmpty();
            
            if (utils.isUndefined(this._routes[name])) {
                return null;
            }
            
            return this._routes[name];
        }
    };
})(gsoft.utils);