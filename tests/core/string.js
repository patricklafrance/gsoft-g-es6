(function() { 
    "use strict";

    describe("String", function() {
        describe("format", function() {
            it("Can format with multiple values", function() {
                expect("{0}{1}{2}".format("1", "2", "3")).toBe("123");
            });
        });

        describe("endsWith", function() {
            var str = "To be, or not to be, that is the question.";

            it("When ends with the specified value, return true", function() {
                expect(str.endsWith("question.")).toBeTruthy();
            });

            it("When do not ends with the specified value, return false", function() {
                expect(str.endsWith("To be")).toBeFalsy();
                expect(str.endsWith("that is")).toBeFalsy();
            });

            describe("When an ending position is specified", function() {
                it("If the substring ends with the specified value, return true", function() {
                    expect(str.endsWith("to be", 19)).toBeTruthy();
                });

                it("If the substring do not ends with the specified value, return false", function() {
                    expect(str.endsWith("To be", 19)).toBeFalsy();
                    expect(str.endsWith("not to", 19)).toBeFalsy();
                    expect(str.endsWith("question.", 19)).toBeFalsy();
                });
            });
        });

        describe("startsWith", function() {
            var str = "To be, or not to be, that is the question.";

            it("When starts with the specified value, return true", function() {
                expect(str.startsWith("To be")).toBeTruthy();
            });

            it("When do not starts with the specified value, return false", function() {
                expect(str.startsWith("not to be")).toBeFalsy();
                expect(str.startsWith("that")).toBeFalsy();
                expect(str.startsWith("question.")).toBeFalsy();
            });

            describe("When a starting position is specified", function() {
                it("If the substring starts with the specified value, return true", function() {
                    expect(str.startsWith("not to be", 10)).toBeTruthy();
                });

                it("If the substring do not starts with the specified value, return false", function() {
                    expect(str.startsWith("To be", 10)).toBeFalsy();
                    expect(str.startsWith("that", 10)).toBeFalsy();
                    expect(str.startsWith("question.", 10)).toBeFalsy();
                });
            });
        });

        describe("contains", function() {
            var str = "To be, or not to be, that is the question.";

            it("When contains the specified value at the beginning, return true", function() {
                expect(str.contains("To be")).toBeTruthy();
            });

            it("When contains the specified value in the middle, return true", function() {
                expect(str.contains("be, that")).toBeTruthy();
            });

            it("When contains the specified value at the end, return true", function() {
                expect(str.contains("question.")).toBeTruthy();
            });

            it("When do not contains the specified value, return false", function() {
                expect(str.contains("non existent")).toBeFalsy();
            });

            it("When contains the specified value with the wrong casing, return false", function() {
                expect(str.contains("TO BE")).toBeFalsy();
            });

            describe("When a starting position is specified", function() {
                it("If the substring contains the specified value at the beginning, return true", function() {
                    expect(str.contains("that", 21)).toBeTruthy();
                });

                it("If the substring contains the specified value in the middle, return true", function() {
                    expect(str.contains("the", 21)).toBeTruthy();
                });

                it("If the substring contains the specified value at the end, return true", function() {
                    expect(str.contains("question.", 21)).toBeTruthy();
                });

                it("If the substring do not contains the specified, return false", function() {
                    expect(str.contains("not to", 21)).toBeFalsy();
                });
            });
        });
    });
})();