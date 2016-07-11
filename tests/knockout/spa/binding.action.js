(function(helpers, dataSampler) {
    "use strict";
    
    describe("spa.binding.action", function() {
        var containerElement = null;
        var name = null;
        var url = null;

        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
            
            name = dataSampler.generateString(10);
            url = dataSampler.generateString(10);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });

        describe("When the DOM element type is an HTML link", function() {
            beforeEach(function() {
                gsoft.spa.shell.registerPage({ name: name, url: url, viewUrl: dataSampler.generateString(10) });
            });

            it("Set HREF property to route URL", function() {
                containerElement.innerHTML = `<a data-bind=\"action: { name: '${name}' }\"></a>`;

                ko.applyBindings({}, containerElement);

                var element = containerElement.getElementsByTagName("a")[0];
                
                expect(element.getAttribute("href")).toBe(url);
            });
        });

        describe("When the DOM element type is not an HTML link", function() {
            beforeEach(function() {
                gsoft.spa.shell.registerPage({ name: name, url: url, viewUrl: dataSampler.generateString(10) });
            });

            afterEach(function() {
                ko.bindingHandlers.action._redirectDelay = 0;
            });

            it("Add an on click event to redirect to route URL ", function() {
                spyOn(gsoft.spa.utils, "_navigate");

                containerElement.innerHTML = `<button data-bind=\"action: { name: '${name}' }\"></button>`;
                
                ko.applyBindings({}, containerElement);

                var element = containerElement.getElementsByTagName("button")[0];
                helpers.dom.triggerEvent(element, "click");

                expect(gsoft.spa.utils._navigate).toHaveBeenCalledWith(url);
            });

            it("When a redirect delay is specified, defer redirect until the delay is over", function(done) {
                spyOn(gsoft.spa.utils, "_navigate");

                var delay = 10;
                
                containerElement.innerHTML = `<button data-bind=\"action: { name: '${name}', redirectDelay: ${delay} }\"></button>`;

                ko.applyBindings({}, containerElement);

                var element = containerElement.getElementsByTagName("button")[0];
                helpers.dom.triggerEvent(element, "click");

                expect(gsoft.spa.utils._navigate).not.toHaveBeenCalled();

                setTimeout(function() {
                    expect(gsoft.spa.utils._navigate).toHaveBeenCalledWith(url);
                    done();
                }, delay + 1);
            });

            it("When a default redirect delay is specified, defer redirect until the delay is over", function(done) {
                spyOn(gsoft.spa.utils, "_navigate");

                var delay = ko.bindingHandlers.action._redirectDelay = 10;
                
                containerElement.innerHTML = `<button data-bind=\"action: { name: '${name}' }\"></button>`;

                ko.applyBindings({}, containerElement);

                var element = containerElement.getElementsByTagName("button")[0];
                helpers.dom.triggerEvent(element, "click");
                
                expect(gsoft.spa.utils._navigate).not.toHaveBeenCalled();

                setTimeout(function() {
                    expect(gsoft.spa.utils._navigate).toHaveBeenCalledWith(url);
                    done();
                }, delay + 1);
            });

            it("When the 'newWindow' parameter is specified, open url in a new window", function() {
                spyOn(gsoft.spa.utils, "_openWindow");

                containerElement.innerHTML = `<button data-bind=\"action: { name: '${name}', newWindow: true }\"></button>`;
                
                ko.applyBindings({}, containerElement);

                var element = containerElement.getElementsByTagName("button")[0];
                helpers.dom.triggerEvent(element, "click");
                
                expect(gsoft.spa.utils._openWindow).toHaveBeenCalled();
            });
        });

        describe("When there is routes parameters", function() {
            var param1 = null;
            var param2 = null;

            beforeEach(function() {
                param1 = dataSampler.generateString(10);
                param2 = dataSampler.generateString(10);

                gsoft.spa.shell.registerPage({ name: name, url: `${url}/:param1/:param2`, viewUrl: dataSampler.generateString(10) });
            });

            it("Can be non observable parameters", function() {
                containerElement.innerHTML = `<a data-bind=\"action: { name: '${name}', parameters: { param1: '${param1}', param2: '${param2}' } }\"></a>`;

                ko.applyBindings({}, containerElement);
                
                var element = containerElement.getElementsByTagName("a")[0];

                expect(element.getAttribute("href")).toBe(`${url}/${param1}/${param2}`);
            });

            it("Can be observable parameters", function() {
                containerElement.innerHTML = `<a data-bind=\"action: { name: '${name}', parameters: { param1: $root.param1, param2: $root.param2 } }\"></a>`;
                
                var vm = {
                    param1: ko.observable(param1),
                    param2: ko.observable(param2)
                };

                ko.applyBindings(vm, containerElement);
                
                var element = containerElement.getElementsByTagName("a")[0];

                expect(element.getAttribute("href")).toBe(`${url}/${param1}/${param2}`);
            });

            it("When an observable parameter value change, the route URL is updated", function() {
                containerElement.innerHTML = `<a data-bind=\"action: { name: '${name}', parameters: { param1: $root.param1, param2: $root.param2 } }\"></a>`;

                var vm = {
                    param1: ko.observable(param1),
                    param2: ko.observable(param2)
                };

                ko.applyBindings(vm, containerElement);

                vm.param1("foo");
                vm.param2("bar");
                
                var element = containerElement.getElementsByTagName("a")[0];

                expect(element.getAttribute("href")).toBe(`${url}/foo/bar`);
            });
        });

        it("Route name can be an observable", function() {
            gsoft.spa.shell.registerPage({ name: name, url: url, viewUrl: dataSampler.generateString(10) });
            
            containerElement.innerHTML = "<a data-bind=\"action: { name: $root.name }\"></a>";

            var vm = {
                name: ko.observable(name)
            };

            ko.applyBindings(vm, containerElement);

            var element = containerElement.getElementsByTagName("a")[0];
            
            expect(element.getAttribute("href")).toBe(url);
        });
    });
})(test.helpers,
   test.dataSampler);