// Date
// ---------------------------------

(function($, utils) {
    var fromISOString = null;
    var toISOString = null;

    // If parsing a string representing an ISO-8601 date with the native JavaScript Date object
    // doesn't return "NaN", it means that the native parsing of an ISO-8601 date is supported.
    if (!isNaN(Date.parse("2010-12-07T11:02:10.100-09:00")) && !gsoft.forceShims) {
        // The conversion is done with the native JavaScript Date object which support this feature
        // since the JavaScript 1.8.5 (ECMAScript 5) specifications.
        fromISOString = function(str) {
            var date = new Date(str);

            if (isNaN(date)) {
                return null;
            }

            return date;
        };
    }
    else {
        // This shim is mostly inspired from http://n8v.enteuxis.org/2010/12/parsing-iso-8601-dates-in-javascript.
        //
        // Some technical aspects about the ISO-8601 format and the timezones has been gathered at:
        // http://en.wikipedia.org/wiki/ISO_8601 and http://en.wikipedia.org/wiki/Time_zone
        fromISOString = function(str) {
            // Extract the date parts from the string to an array. Parts are:
            // [0] is the original string
            // [1] is the year
            // [2] is the month
            // [3] is the day
            // [4] is the hours
            // [5] is the minutes
            // [6] is the seconds
            // [7] is the milliseconds
            // [8] is the timezone offset
            // [9] is the positive or negative offset indicator
            // [10] is the hours offset
            // [11] is the minutes offset
            //
            // Ex. 1: "2010-12-07T11:00:00.000-09:00" parses to: 
            // ["2010-12-07T11:00:00.000-09:00", "2010", "12", "07", "11", "00", "00", ".000", "-09:00", "-", "09", "00"]
            //
            // Ex. 2: "2010-12-07T11:00:00.000Z" parses to:
            // ["2010-12-07T11:00:00.000Z", "2010", "12", "07", "11", "00", "00", ".000", "Z", undefined, undefined, undefined]
            var parts = str.match(/(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/);

            if (utils.isNull(parts)) {
                return null;
            }

            // Parse strings, leading zero into integers.
            $.each([1, 2, 3, 4, 5, 6, 10, 11], function() {
                parts[this] = parseInt(parts[this], 10);
            });

            // Calculate the number of milliseconds elapsed from 1970-01-01, universal time.
            var milliseconds = Date.UTC(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);

            parts[7] = parseFloat(parts[7]);

            // If there are milliseconds, add them.
            if (parts[7] > 0) {
                milliseconds += Math.round(parts[7] * 1000);
            }

            // If there's a timezone offset, calculate it. 
            // The character "Z" at position 8 means that there is no timezone offset.
            if (!utils.isNull(parts[8]) && !utils.isNull(parts[10]) && parts[8] !== "Z") {
                var offset = parts[10] * 60 * 60 * 1000;

                if (!utils.isNull(parts[11])) {
                    offset += parts[11] * 60 * 1000;
                }

                if (parts[9] === "-") {
                    milliseconds += offset;
                } else {
                    milliseconds -= offset;
                }
            }

            return new Date(milliseconds);
        };
    }

    if (!utils.isNull(Date.prototype.toISOString) && !gsoft.forceShims) {
        // The conversion is done with the native JavaScript Date object which support this feature 
        // since the JavaScript 1.8.5 (ECMAScript 5) specifications.
        toISOString = function(date) {
            return date.toISOString();
        };
    }
    else {
        // This shim is mostly inspired from
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
        toISOString = function(date) {
            function pad(number) {
                var value = number.toString();
                    
                if (value.length === 1) {
                    value = "0" + value;
                }
                    
                return value;
            }

            // Never return a timezone since JavaScript Date stores the date internally as UTC.
            // This means that the timezone would always be the local timezone, wathever was the original timezone.
            return date.getUTCFullYear() +
                    "-" + pad(date.getUTCMonth() + 1) +
                    "-" + pad(date.getUTCDate()) +
                    "T" + pad(date.getUTCHours()) +
                    ":" + pad(date.getUTCMinutes()) +
                    ":" + pad(date.getUTCSeconds()) +
                    "." + (date.getUTCMilliseconds() / 1000).toFixed(3).toString().slice(2, 5) +
                    "Z";
        };
    }

    gsoft.date = {
        // summary:
        //         Convert a string representing an ISO-8601 date to a JavaScript Date object. 
        // description:
        //        The conversion respect the JavaScript 1.8.5 (ECMAScript 5) specifications which mean that the date, time
        //        and timezone offset parts are supported.
        //
        //        The code has been mostly inspired from http://n8v.enteuxis.org/2010/12/parsing-iso-8601-dates-in-javascript.
        //
        //        Some technical aspects about the ISO-8601 format and the timezones has been gathered at:
        //        http://www.w3.org/TR/NOTE-datetime
        // str:
        //        A string that represents an ISO-8601 date.
        // returns:
        //         A JavaScript Date object if the string representing a valid ISO-8601 date, otherwise; null.
        fromISOString: function(str) {
            if (utils.isNullOrEmpty(str)) {
                return null;
            }

            return fromISOString(str);
        },

        // summary:
        //          Convert a JavaScript Date object to a string respecting the ISO-8601 date specifications. 
        // description:
        //        The conversion respect the JavaScript 1.8.5 (ECMAScript 5) specifications which mean that the date, time
        //        and parts are supported. The timezone parts is ignored since it is not store by a JavaScript Date object.
        // date:
        //        A JavaScript Date object.
        // returns:
        //         A string.
        toISOString: function(date) {
            if (utils.isNull(date) || !utils.isDate(date)) {
                return "";
            }

            return toISOString(date);
        }
    };
})(jQuery,
   gsoft.utils);