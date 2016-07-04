interface GMediatorStatic {
    subscribe(channel: string, handlerCallback: Function): void;
    subscribeOnce(channel: string, handlerCallback: Function): void;
    unsubscribe(channel: string, handlerCallback: Function): void;
    publish(channel: string): void;
}

interface GStatic {
    namespace(...names: string[]): any;
    ensure(parameter: any, parameterName?: string): any;
    ensure(parameter: any, parameterName?: string, context?: any): any;

    spa: GSpaStatic;
    widgets: GWidgetStatic
    mediator: GMediatorStatic;
}

declare var g: GStatic;

declare module "g" {
    export = g;
}