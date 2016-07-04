// Utils
// ---------------------------------

(function() {
    // summary:
    //         Determines wether @value is a jQuery element.
    // value: Object
    //         The value to perform the check against.
    // returns:
    //         A boolean.
    gsoft.utils.isjQueryElement = function(value) {
        return value instanceof jQuery;
    };
    
    // summary:
    //         Removes the item at position @index from the @array.
    // array: Array
    //         The array to remove an item from.
    // index: Integer
    //         The index of the item to remove from the array.
    gsoft.utils.arrayRemoveIndex = gsoft.utils.arrayRemoveAt;
})();