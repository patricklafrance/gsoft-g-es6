// jscs:disable requireBlocksOnNewline

(function(helpers) {
    "use strict";
    
    describe("bindings.disabledText", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("When the enable binding is true, the element has the original text", function() {
            containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', enable: true\"></a>";
            
            ko.applyBindings({}, containerElement);
            
            var link = document.getElementById("foo");
            
            expect(link.innerHTML).toBe("foo");
        });
        
        it("When the enable binding is false, the element has the disabled text", function() {
            containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', enable: false\"></a>";
            
            ko.applyBindings({}, containerElement);
            
            var link = document.getElementById("foo");
            
            expect(link.innerHTML).toBe("bar");
        });
        
        it("When the disable binding is true, the element has the disabled text", function() {
            containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', disable: true\"></a>";
            
            ko.applyBindings({}, containerElement);
            
            var link = document.getElementById("foo");
            
            expect(link.innerHTML).toBe("bar");
        });
        
        it("When the disable binding is false, the element has the original text", function() {
            containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', disable: false\"></a>";
            
            ko.applyBindings({}, containerElement);
            
            var link = document.getElementById("foo");
            
            expect(link.innerHTML).toBe("foo");
        });
        
        it("When the text binding is not specified, use the element inner HTML as text", function() {
            containerElement.innerHTML = "<a id=\"foo\" data-bind=\"disabledText: 'bar', disable: false\">foo</a>";
            
            ko.applyBindings({}, containerElement);
            
            var link = document.getElementById("foo");
            
            expect(link.innerHTML).toBe("foo");
        });
        
        describe("When the enable binding value is an observable", function() {
            it("It works when value is true", function() {
                containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', enable: $root.isEnabled\"></a>";
                
                var viewModel = {
                    isEnabled: ko.observable(true)
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                var link = document.getElementById("foo");
            
                expect(link.innerHTML).toBe("foo");
            });
            
            it("It works when value is false", function() {
                containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', enable: $root.isEnabled\"></a>";
                
                var viewModel = {
                    isEnabled: ko.observable(false)
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                var link = document.getElementById("foo");
            
                expect(link.innerHTML).toBe("bar");
            });
            
            it("When the value changed, the CSS class is reevaluated", function() {
                containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', enable: $root.isEnabled\"></a>";
                
                var viewModel = {
                    isEnabled: ko.observable(false)
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                viewModel.isEnabled(true);
                
                var link = document.getElementById("foo");
            
                expect(link.innerHTML).toBe("foo");
            });
        });
        
        describe("When the disable binding value is an observable", function() {
            it("It works when value is true", function() {
                containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', disable: $root.isDisabled\"></a>";
            
                var viewModel = {
                    isDisabled:  ko.observable(true)
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                var link = document.getElementById("foo");

                expect(link.innerHTML).toBe("bar");
            });
            
            it("It works when value is false", function() {
                containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', disable: $root.isDisabled\"></a>";
            
                var viewModel = {
                    isDisabled:  ko.observable(false)
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                var link = document.getElementById("foo");

                expect(link.innerHTML).toBe("foo");
            });
            
            it("When the value changed, the CSS class is reevaluated", function() {
                containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: 'foo', disabledText: 'bar', disable: $root.isDisabled\"></a>";
            
                var viewModel = {
                    isDisabled:  ko.observable(true)
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                viewModel.isDisabled(false);

                var link = document.getElementById("foo");

                expect(link.innerHTML).toBe("foo");
            });
        });
        
        describe("When the text binding value is an observable", function() {
            it("It works", function() {
                containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: $root.text, disabledText: 'bar', disable: false\"></a>";
                
                var viewModel = {
                    text:  ko.observable("foo")
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                var link = document.getElementById("foo");

                expect(link.innerHTML).toBe("foo");
            });
            
            it("When the value changed, the text is updated", function() {
                containerElement.innerHTML = "<a id=\"foo\" data-bind=\"text: $root.text, disabledText: 'bar', disable: false\"></a>";
                
                var viewModel = {
                    text:  ko.observable("foo")
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                viewModel.text("foo2");
                
                var link = document.getElementById("foo");

                expect(link.innerHTML).toBe("foo2");
            });
        });
        
        it("When the value is an observable, throw an exception", function() {
            containerElement.innerHTML = "<button data-bind=\"disabledText: ko.observable('foo'), disable: true\"></button>";

            expect(function() { ko.applyBindings({}, containerElement); }).toThrow();
        });
        
        it("When the enable and disable bindings are not specified, throw an exception", function() {
            containerElement.innerHTML = "<button data-bind=\"disabledText: 'foo'\"></button>";

            expect(function() { ko.applyBindings({}, containerElement); }).toThrow();
        });
    });
})(test.helpers);

// jscs:enable requireBlocksOnNewline