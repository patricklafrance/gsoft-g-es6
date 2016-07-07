// Component loader
// ---------------------------------

(function($, utils) {
    var componentLoader = spa.componentLoader = {
        loadViewModel: function(componentName, ViewModelConfig, callback) {
            if (utils.isFunction(ViewModelConfig)) {
                callback(function(params, componentInfo) {
                    var resources = componentLoader._getResources(componentInfo);
                    var viewModel = new ViewModelConfig(params, resources);
    
                    if (utils.isFunction(viewModel._beforeBind)) {
                        viewModel._beforeBind.call(viewModel);
                    }
    
                    setTimeout(function() {
                        if (utils.isFunction(viewModel._afterBind)) {
                            viewModel._afterBind.call(viewModel);
                        }
                    }, 0);
    
                    return viewModel;
                });
            } else {
                // Unsupported view model configuration, let another component loader handle it.
                callback(null);
            }
        },

        // summary:
        //         Retrieve the resources associated to the component.
        // description:
        //         The resources will be retrieved from the data-resources attribute of the first
        //         DOM element of the component template.
        // componentInfo: Object
        //         The component configuration.
        // returns:
        //         The resources if available, otherwise null.
        _getResources: function(componentInfo) {
            var firstChildElement = $("> :first-child", componentInfo.element);
            
            if (firstChildElement.length > 0) {
                return firstChildElement.data("resources");
            }

            return null;
        }
    };
})(jQuery,
   gsoft.utils);