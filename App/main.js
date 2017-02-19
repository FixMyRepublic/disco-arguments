
var Main = (function () {
    function Main() {
    }
    Main.bootstrapper = function (app, viewLocator, system, router, ko, mapping, jquery, jqueryui) {
        var _this = this;
        system.debug(true);

        ko.mapping = mapping;

        ko.bindingHandlers.draggable = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                jQuery(element).data('bindingContext', bindingContext).draggable(bindingContext.$root.draggable);
                return ko.bindingHandlers.with.init.apply(_this, arguments);
            }
        };
        ko.bindingHandlers.droppable = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                jQuery(element).data('bindingContext', bindingContext).droppable(bindingContext.$root.droppable);
                return ko.bindingHandlers.with.init.apply(_this, arguments);
            }
        };

        ko.protectedObservable = function (initialValue) {
            var _actualValue = ko.observable(initialValue), _tempValue = initialValue;

            var result = ko.computed({
                read: function () {
                    return _actualValue();
                },
                write: function (newValue) {
                    _tempValue = newValue;
                }
            }).extend({ notify: "always" });

            result.commit = function () {
                if (_tempValue !== _actualValue()) {
                    _actualValue(_tempValue);
                }
            };

            result.reset = function () {
                _actualValue.valueHasMutated();
                _tempValue = _actualValue();
            };

            result.tempValue = function () {
                return _tempValue;
            };

            return result;
        };

        app.title = 'd!scoArguments';

        app.configurePlugins({
            dialog: true,
            router: true
        });

        app.start().then(function () {
            viewLocator.useConvention();

            app.setRoot('viewmodels/shell');
        });
    };
    return Main;
})();

require.config({
    paths: {
        text: '../Scripts/text',
        durandal: '../Scripts/durandal',
        plugins: '../Scripts/durandal/plugins',
        transitions: '../Scripts/durandal/transitions',
        knockout: '../Scripts/knockout-3.1.0',
        komapping: '../Scripts/knockout.mapping-latest',
        jquery: '../Scripts/jquery-2.1.1',
        jqueryui: '../Scripts/jquery-ui-1.10.4',
        disco: '../Scripts/disco/disco'
    }
});

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'plugins/router', 'knockout', 'komapping', 'jquery', 'jqueryui'], Main.bootstrapper);
//# sourceMappingURL=main.js.map
