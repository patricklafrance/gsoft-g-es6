// Route registry
// ---------------------------------

(function(utils, ensure, Route) {
    gsoft.spa.routeRegistry = {
        _routes: {},

        add: function(name, url) {
            var route = new Route(name, url);

            this._routes[name] = route;
        },

        find: function(name) {
            ensure(name, "name", "RouteRegistry.add").isNotNullOrEmpty();
            
            if (utils.isUndefined(this._routes[name])) {
                return null;
            }
            
            return this._routes[name];
        }
    };
})(gsoft.utils,
   gsoft.ensure,
   gsoft.spa.Route);