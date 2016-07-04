/* jshint esnext: true */

(function(helpers) {
    "use strict";
    
    describe("spa.es6", function() {
        it("Can create a page viewmodel from the base view model", function() {
            class ViewModel extends g.spa.viewModel {
                constructor() {
                    super();
                }
                
                fct() {
                    return "foo";
                }
            }
            
            var instance = new ViewModel();
            
            expect(helpers.isFunction(instance.bind)).toBeTruthy();
        });
    });
})(test.helpers);

/* jshint esnext: false */