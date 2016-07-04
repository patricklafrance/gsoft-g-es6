// String
// ---------------------------------

(function(utils) {
    // summary:
    //         Format the string using the specified pattern and values.
    // [0..]: String
    //        Parts of formatted string.
    // returns:
    //         A string.
    // example:
    //         "Hello {0} from {1}!".format("John Doe", "GSoft");
    String.prototype.format = function() {
        var args = arguments;

        return this.replace(/\{(\d+)\}/g, function(m, n) {
            return args[n];
        });
    };

    if (utils.isUndefined(String.prototype.endsWith) || gsoft.forceShims) {
        String.prototype.endsWith = function(value, position) {
            if (utils.isNull(position)) {
                position = this.length;
            }

            return this.lastIndexOf(value) === (position - value.length);
        };
    }

    if (utils.isUndefined(String.prototype.startsWith) || gsoft.forceShims) {
        String.prototype.startsWith = function(value, position) {
            if (utils.isNull(position)) {
                position = 0;
            }

            return this.indexOf(value, position) === position;
        };
    }

    if (utils.isUndefined(String.prototype.contains) || gsoft.forceShims) {
        String.prototype.contains = function(value, position) {
            return this.indexOf(value, position) !== -1;
        };
    }
})(gsoft.utils);