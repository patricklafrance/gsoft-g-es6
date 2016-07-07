// Page context
// ---------------------------------

(function() {
    gsoft.spa.PageContext = function(shell) {
        this.getService = shell.getService.bind(shell);
        this.subscribe = shell.subscribe.bind(shell);
        this.subscribeOnce = shell.subscribeOnce.bind(shell);
        this.unsubscribe = shell.unsubscribe.bind(shell);
        this.publish = shell.publish.bind(shell);
    };
})();