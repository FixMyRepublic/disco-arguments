var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Context = (function (_super) {
        __extends(Context, _super);
        function Context(serviceUri) {
            var config = {
                name: 'oData',
                oDataServiceHost: serviceUri,
                maxDataServiceVersion: '3.0',
                // HINT: The following line is not working yet.
                // TODO: As a Developer I want to specify custom request headers so that I can set the odata metadata options and other headers.
                Accept: 'application/json;odata=nometadata'
            };

            _super.call(this, config);
        }
        return Context;
    })(Default.Container);
    exports.Context = Context;
});
//# sourceMappingURL=disco.js.map
