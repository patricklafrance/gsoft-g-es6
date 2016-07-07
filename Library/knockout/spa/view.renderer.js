// View renderer service
// ---------------------------------

(function($) {
    spa.viewRenderer = {
        render: function(targetElement, view) {
            gsoft.ensure(targetElement, "targetElement", "ViewRenderer.renderView").isDomElement();

            // Inserting the HTML with innerHTML, has unwanted side effects, like not executing the <script> tag.
            // For now we rely on jQuery to do all the dirty work to ensure those side affect do not happens.
            $(targetElement).html(view);
        },

        clear: function(/* targetElement */) {
        }
    };
})(jQuery);