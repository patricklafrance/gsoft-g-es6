// jQuery extensions
// ---------------------------------

(function($) {
    // summary:
    //         Determine if a jQuery element exists.
    // returns:
    //         A boolean.
    // example:
    //         $(".element").exists();
    $.fn.exists = function() {
        return this.length > 0;
    };
})(jQuery);