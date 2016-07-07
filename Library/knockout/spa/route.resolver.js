// Route URL resolver
// ---------------------------------

(function(utils) {
    spa.routeUrlResolver = {
        getRouteUrl: function(routes, name, parameters) {
            var route = routes.find(name);

            if (utils.isNull(route)) {
                throw new gsoft.ArgumentError(_.formatString("RouteUrlResolver.getRouteUrl - Cannot find a route named {0}", name));
            }

            return route.getUrl(parameters);
        }
    };
})(gsoft.utils);