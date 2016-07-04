// Route URL resolver
// ---------------------------------

(function(utils) {
    gsoft.spa.routeUrlResolver = {
        getRouteUrl: function(routes, name, parameters) {
            var route = routes.find(name);

            if (utils.isNull(route)) {
                throw new gsoft.ArgumentError("RouteUrlResolver.getRouteUrl - Cannot find a route named {0}".format(name));
            }

            return route.getUrl(parameters);
        }
    };
})(gsoft.utils);