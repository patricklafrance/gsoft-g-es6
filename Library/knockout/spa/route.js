// Route
// ---------------------------------

(function(utils) {
    spa.Route = function(name, url) {
        gsoft.ensure(name, "name", "Route").isNotNullOrEmpty();
        gsoft.ensure(url, "url", "Route").isNotNullOrEmpty();

        this.name = name;
        this.url = url;
    };

    spa.Route.prototype = {
        getUrl: function(parameters) {
            var url = this._removeUnspecifiedOptionalParameters(this._replaceParameters(this.url, parameters));

            if (url.indexOf("/:") !== -1) {
                throw new gsoft.ArgumentError(_.formatString("Route.getUrl - You must specify a value for every required parameters of the route {0}.", this.url));
            }

            return url;
        },

        _replaceParameters: function(url, parameters) {
            if (utils.isObject(parameters)) {
                utils.objectForEach(parameters, function(parameter, parameterKey) {
                    // Do not change the replacement order.
                    url = url.replace(_.formatString("(/:{0})", parameterKey), _.formatString("/{0}", parameter));
                    url = url.replace(_.formatString(":{0}", parameterKey), parameter);
                });
            }

            return url;
        },

        _removeUnspecifiedOptionalParameters: function(url) {
            url = url.replace(/(\(\/:.*\))/g, "");

            return url;
        }
    };
})(gsoft.utils);