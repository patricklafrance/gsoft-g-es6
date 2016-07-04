(function() { 
    "use strict";

    describe("date", function() {
        describe("fromISOString", function() {
            it("When the string is null or empty, return null", function() {
                expect(gsoft.date.fromISOString(null)).toBeNull();
                expect(gsoft.date.fromISOString("")).toBeNull();
            });

            it("When the string do not match the ISO date format,return null", function() {
                expect(gsoft.date.fromISOString("\/Date(1330848000000-0800)\/")).toBeNull();
                expect(gsoft.date.fromISOString("20-12-07T1:02:10.100Z")).toBeNull();
                expect(gsoft.date.fromISOString("2010-07T1:02:10.100Z")).toBeNull();
                expect(gsoft.date.fromISOString("2010-12-T10:02:10.100Z")).toBeNull();
                expect(gsoft.date.fromISOString("2010-12-07T1:02:10.100Z")).toBeNull();
                expect(gsoft.date.fromISOString("2010-12-07T:02:10.100Z")).toBeNull();
            });

            it("When the string match the date ISO format and do not contains any offset, return a Date without offset", function() {
                var date = gsoft.date.fromISOString("2010-12-07T11:02:10.100Z");

                expect(date).not.toBeNull();
                expect(date.getUTCFullYear()).toBe(2010);
                expect(date.getUTCMonth()).toBe(11);
                expect(date.getUTCDate()).toBe(7);
                expect(date.getUTCHours()).toBe(11);
                expect(date.getUTCMinutes()).toBe(2);
                expect(date.getSeconds()).toBe(10);
                expect(date.getUTCMilliseconds()).toBe(100);
            });

            it("When the string match the date ISO format and contains a negative offset, return a Date with the offset", function() {
                var date = gsoft.date.fromISOString("2010-12-07T11:02:10.100-09:00");

                expect(date).not.toBeNull();
                expect(date.getUTCFullYear()).toBe(2010);
                expect(date.getUTCMonth()).toBe(11);
                expect(date.getUTCDate()).toBe(7);
                expect(date.getUTCHours()).toBe(20);
                expect(date.getUTCMinutes()).toBe(2);
                expect(date.getSeconds()).toBe(10);
                expect(date.getUTCMilliseconds()).toBe(100);
            });

            it("When the string match the date ISO format and contains a positive offset, return a Date with the offset", function() {
                var date = gsoft.date.fromISOString("2010-12-07T11:02:10.100+09:00");

                expect(date).not.toBeNull();
                expect(date.getUTCFullYear()).toBe(2010);
                expect(date.getUTCMonth()).toBe(11);
                expect(date.getUTCDate()).toBe(7);
                expect(date.getUTCHours()).toBe(2);
                expect(date.getUTCMinutes()).toBe(2);
                expect(date.getSeconds()).toBe(10);
                expect(date.getUTCMilliseconds()).toBe(100);
            });
        });

        describe("toISOString", function() {
            it("When the date is null, returns an empty string", function() {
                expect(gsoft.date.toISOString(null)).toBe("");
            });

            it("When the date is not a valid date, returns an empty string", function() {
                var date = "aaaaaa";
                var str = gsoft.date.toISOString(date);

                expect(str).toBe("");
            });

            it("Date created with y, m, d, h, m, s, ms, return an ISO string matching the date", function() {
                var date = new Date(2008, 8, 10, 12, 12, 13, 14);
                var str = gsoft.date.toISOString(date);

                expect(str).toBe("2008-09-10T16:12:13.014Z");
            });

            it("Date created with y, m, d, return an ISO string matching the date", function() {
                var date = new Date(2014, 1, 28);
                var str = gsoft.date.toISOString(date);

                expect(str).toBe("2014-02-28T05:00:00.000Z");
            });

            it("Date created with ms since 1 January 1970 00:00:00 UTC, return an ISO string matching the date", function() {
                var date = new Date(10000000);
                var str = gsoft.date.toISOString(date);

                expect(str).toBe("1970-01-01T02:46:40.000Z");
            });

            it("Date created with string value representing a date, return an ISO string matching the date", function() {
                var date = new Date("2009/07/13 12:34:56");
                var str = gsoft.date.toISOString(date);

                expect(str).toBe("2009-07-13T16:34:56.000Z");
            });

            it("Date create with an ISO string value without a timezone offset, return an ISO string matching the date", function() {
                var date = gsoft.date.fromISOString("2010-12-07T11:02:10.100Z");
                var str = gsoft.date.toISOString(date);

                expect(str).toBe("2010-12-07T11:02:10.100Z");
            });

            it("Date create with an ISO string value with a timezone offset, return an ISO string matching the date", function() {
                var date = gsoft.date.fromISOString("2010-12-07T11:02:10.100+09:00");
                var str = gsoft.date.toISOString(date);

                expect(str).toBe("2010-12-07T02:02:10.100Z");
            });
        });
    });
})();