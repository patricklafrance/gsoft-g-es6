/// <reference path="../../knockout/knockout.d.ts" />

interface GSpaAppContext {
    getService(serviceName: string): any;
    subscribe(channel: any, callback: Function, options?: any): any;
    subscribeOnce(channel: any, callback: Function, options?: any): any;
    unsubscribe(channel: any, callback: Function): any;
    publish(channel: any, ...values: any[]): any;
    publishError(channel: any, errorType: any, value?: any): any;
}

interface GSpaViewModel {
}

interface GSpaPageOption {
    name: string;
    url: string;
    viewUrl: string;
    viewModelFactory(context: GSpaAppContext, routeParameters?: any): any;
    aliases?: string[];
    viewModelBinder?(): any;
}

interface GSpaServiceRegistrationOptions {
    name: string;
    factory: Function;
}

interface GSpaServices {
    http: Function;
    objectNavigator: Function;
}

interface GSpaMediatorChannelStatic {
    HttpBeforeRequest: string,      //"http-before-request"
    HttpRequestSucceeded: string,   //"http-request-succeeded"
    HttpRequestCompleted: string;   //"http-request-completed"
}

interface GSpaServiceStatic {
    Http: string,               //"http"
    ObjectNavigator: string;    //"object-navigator"
}

interface GSpaHttpServiceSettings extends JQueryAjaxSettings {
    mapResponseToObservables?: boolean;
    responseFilter?: Function;
}

interface GSpaHttpService<T> {
    get(settings: GSpaHttpServiceSettings): JQueryPromise<T>;
    post(settings: GSpaHttpServiceSettings): JQueryPromise<T>;
}

interface GSpaStatic {
    componentLoader: KnockoutComponentTypes.Loader;
    registerPage(options: GSpaPageOption): any;
    shell: any;
    registerService(options: GSpaServiceRegistrationOptions): void;
    services: GSpaServices;
    Service: GSpaServiceStatic;
    Channel: GSpaMediatorChannelStatic;
}

interface GSpaUtilsStatic {
    _isjQueryPromise(jPromise: any): boolean;
}

interface GUtilsStatic {
    spa: GSpaUtilsStatic;
}