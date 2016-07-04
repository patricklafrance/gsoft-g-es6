// View provider service
// ---------------------------------

(function($, utils, ensure) {
    gsoft.spa.viewProvider = {
        _cache: {},

        // summary:
        //         Retrieve a view from an @url.
        // url: String
        //         The URL of the review to fetch.
        // useCache: Boolean
        //         An optional boolean indicating if the view should be cache.
        // returns:
        //         A jQuery promise.
        get: function(url, useCache) {
            ensure(url, "url", "ViewProvider.get").isNotNullOrEmpty();

            var that = this;

            // Use a "proxy" deferred to handle the view caching feature.
            var deferred = $.Deferred();
            
            // Try to get the view from the cache.
            var view = this._getFromCache(url);

            if (!utils.isNullOrEmpty(view)) {
                deferred.resolveWith(this, [view]);
            } else {
                var promise = this._getFromServer(url);
                
                promise.done(function(response) {
                    if (utils.isNullOrEmpty(response)) {
                        deferred.rejectWith(this, [null, "", "Invalid view."]);

                        // Handle the request failure.
                        that._onRequestFailed(url, null, "The server returned an empty view.", "");
                    }
                    
                    if (useCache === true) {
                        that._cacheView(url, response);
                    }
                    
                    deferred.resolveWith(this, [response]);
                });
            
                promise.fail(function(jqxhr, textStatus, errorThrown) {
                    deferred.rejectWith(this, [jqxhr, textStatus, errorThrown]);

                    // Handle the request failure.
                    that._onRequestFailed(url, jqxhr, textStatus, errorThrown);
                });
            }
            
            return deferred.promise();
        },
        
        _cacheView: function(url, content) {
            this._cache[url] = content;
        },
        
        _getFromCache: function(url) {
            return this._cache[url];
        },
        
        _getFromServer: function(url) {
            return $.ajax({
                url: url,
                cache: false,
                dataType: "html"
            });
        },
        
        _onRequestFailed: function(url, jqxhr, textStatus, errorThrown) {
            this._writeErrorTrace(url, jqxhr, textStatus, errorThrown);
            this._publishInvalidViewError(url, jqxhr, textStatus, errorThrown);
        },
        
        _writeErrorTrace: function(url, jqxhr, textStatus, errorThrown) {
            utils.groupTrace([
                ["[SHELL] An error occured while fetching view at \"%s\"", url],
                ["Status code: %s", utils.isNull(jqxhr) ? "{NO_STATUS}" : jqxhr.status],
                ["Status text: %s", utils.isNull(jqxhr) ? "{NO_STATUS_TEXT}" : jqxhr.statusText],
                ["Exception: %s", utils.isNullOrEmpty(textStatus) ? "{NO_EXCEPTION}" : textStatus],
                ["HTTP error: %s", utils.isNullOrEmpty(errorThrown) ? "{NO_HTTP_ERROR}" : errorThrown]
            ]);
        },

        _publishInvalidViewError: function(url, jqxhr, textStatus, errorThrown) {
            this._publishError("InvalidView", {
                url: url,
                jqxhr: jqxhr,
                textStatus: textStatus,
                errorThrown: errorThrown
            });
        },

        _publishError: function(errorType, data) {
            gsoft.spa.shell.publishError(gsoft.spa.Component.ViewProvider, errorType, data);
        }
    };
})(jQuery, 
   gsoft.utils, 
   gsoft.ensure);