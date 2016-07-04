// Route
// ---------------------------------

(function(utils, ensure) {
    gsoft.spa.Route = function(name, url) {
        ensure(name, "name", "Route").isNotNullOrEmpty();
        ensure(url, "url", "Route").isNotNullOrEmpty();

        this.name = name;
        this.url = url;
    };

    gsoft.spa.Route.prototype = {
        getUrl: function(parameters) {
            var url = this._removeUnspecifiedOptionalParameters(this._replaceParameters(this.url, parameters));

            if (url.indexOf("/:") !== -1) {
                throw new gsoft.ArgumentError("Route.getUrl - You must specify a value for every required parameters of the route {0}.".format(this.url));
            }

            return url;
        },

        _replaceParameters: function(url, parameters) {
            if (utils.isObject(parameters)) {
                utils.objectForEach(parameters, function(parameter, parameterKey) {
                    // Do not change the replacement order.
                    url = url.replace("(/:{0})".format(parameterKey), "/{0}".format(parameter));
                    url = url.replace(":{0}".format(parameterKey), parameter);
                });
            }

            return url;
        },

        _removeUnspecifiedOptionalParameters: function(url) {
            url = url.replace(/(\(\/:.*\))/g, "");

            return url;
        }
    };
})(gsoft.utils,
   gsoft.ensure);