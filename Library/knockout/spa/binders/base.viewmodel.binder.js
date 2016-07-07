// Base ViewModel binder
// ---------------------------------

(function($, utils) {
    spa.ViewModelBinder = {
        _getViewModel: function(viewModelFactory, parameters, element) {
            var resources = this._getResources(element);

            // An accessor function is used to retrieve the view model to let the user create a view model based
            // on dynamic parameters (for example: the route parameters).
            var viewModel = viewModelFactory(parameters, resources, element);

            spa.ensure(viewModel)._isViewModel("ViewModelBinder._getViewModel - \"viewModelFactory\" must return a valid view model.");

            return viewModel;
        },

        // summary:
        //         Retrieve the resources associated to the viewmodel.
        // description:
        //         The resources will be retrieved from the data-resources attribute of the first
        //         child element of the DOM element associated to the view model.
        // element: DOM element
        //         The element associated to the view model.
        // returns:
        //         The resources if available, otherwise null.
        _getResources: function(element) {
            var firstChildElement = $("> :first-child", element);

            if (firstChildElement.length > 0) {
                return firstChildElement.data("resources");
            }

            return null;
        },
        
        // summary:
        //         Retrieve the identification of an @element.
        // description:
        //         Retrieve the identification of an @element. An identification can be the
        //         id of the @element or the CSS class of the @element.
        // element: DOM element
        //         The element associated to the view model.
        // returns:
        //         An element identification is available, otherwise "{ANONYMOUS}".
        _getElementIdentification: function(element) {
            var identitier = element.getAttribute("id");

            if (utils.isNullOrEmpty(identitier)) {
                identitier = element.getAttribute("class");
            }

            return !utils.isNullOrEmpty(identitier) ? identitier : "{ANONYMOUS}";
        },

        _cleanElement: function(element) {
            gsoft.ensure(element, "element", "ViewModelBinder._cleanElement").isDomElement();

            // The trace call has been wrapped inside a check for "debug" mode because it involves extra processing
            // to compute the log message.
            if (gsoft.debug === true) {
                utils.groupTrace([
                    ["[SHELL] Clearing knockout bindings for DOM element \"%s\"", this._getElementIdentification(element)],
                    [element]
                ]);
            }

            if (!utils.isNull(ko.dataFor(element))) {
                ko.cleanNode(element);
            }
        },

        _disposeViewModel: function(viewModel) {
            if (utils.isFunction(viewModel.dispose)) {
                viewModel.dispose();
            } else {
                utils.trace("[SHELL] Cannot dispose view model because a \"dispose\" function is not available.");
            }
        }
    };
})(jQuery,
   gsoft.utils);