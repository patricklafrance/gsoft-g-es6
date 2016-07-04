module G.Spa {
    "use strict";

    export class ViewModel implements GSpaViewModel {

        public beforeBind: Function;

        public afterBind: Function;

        public element: any;

        public bind(element: any) {
            g.ensure(element, "element").isDomElement();

            this.element = element;

            if (g.utils.isFunction(this.beforeBind)) {
                const promise = this.beforeBind.call(this);
                if (g.utils.spa._isjQueryPromise(promise)) {
                    promise.done(() => {
                        this.applyBindings();
                    });

                    return promise;
                }
            }

            this.applyBindings();

            return this.createResolvingPromise();
        }

        private applyBindings() {
            ko.applyBindings(this, this.element);

            if (g.utils.isFunction(this.afterBind)) {
                this.afterBind.call(this);
            }
        }

        private createResolvingPromise() {
            const deferred = $.Deferred<void>();
            deferred.resolve();

            return deferred.promise();
        }
    }
}