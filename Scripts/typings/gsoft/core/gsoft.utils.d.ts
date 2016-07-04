interface GUtilsStatic {
    isDomElement(): boolean;
    isDomElement(value: any): boolean;
    isFunction(func: any): boolean;
    isNull(value: any): boolean;
}

interface GStatic {
    utils: GUtilsStatic;
}