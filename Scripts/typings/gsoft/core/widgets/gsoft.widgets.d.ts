/// <reference path="../../../knockout/knockout.d.ts" />

interface GWidgetStatic {
    notifier: GWidgetNotifier;
}

interface GWidgetNotifier {
    loading: Function;
    error: Function;
    saving: Function;
    saved: Function;
    show: Function;
    hide: Function;
}