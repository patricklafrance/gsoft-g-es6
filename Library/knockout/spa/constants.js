// Constants
// --------------------------------

(function() {
    spa.Component = {
        Router: "router",
        ViewProvider: "view-provider",
        SimpleViewModelBinder: "simple-view-model-binder",
        CompositeViewModelBinder: "composite-view-model-binder"
    };

    spa.Channel = {
        Error: "g.spa.error",
        PageChanging: "g.spa.page-changing",
        PageChanged: "g.spa.page-changed",
        HttpBeforeRequest: "g-spa-http-before-request",
        HttpRequestSucceeded: "g-spa-http-request-succeeded",
        HttpRequestCompleted: "g-spa-http-request-completed"
    };
})();