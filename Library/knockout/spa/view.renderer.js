// View renderer service
// ---------------------------------

(function($, ensure) {
    gsoft.spa.viewRenderer = {
        render: function(targetElement, view) {
            ensure(targetElement, "targetElement", "ViewRenderer.renderView").isDomElement();

            // Inserting the HTML with innerHTML, has unwanted side effects, like not executing the <script> tag.
            // For now we rely on jQuery to do all the dirty work to ensure those side affect do not happens.
            $(targetElement).html(view);
        },

        clear: function(/* targetElement */) {
        }
    };
})(jQuery,
   gsoft.ensure);