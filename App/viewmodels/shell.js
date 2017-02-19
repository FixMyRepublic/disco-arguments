define(["require", "exports", 'durandal/app', 'plugins/router'], function(require, exports, _app, _router) {
    var Shell = (function () {
        function Shell(app, router) {
            this.app = app;
            this.router = router;
        }
        Shell.prototype.activate = function () {
            var routes = [
                { route: '', title: 'Trending', moduleId: 'trend', nav: true },
                { route: 'about', title: 'About', moduleId: 'about', nav: true },
                { route: 'discussion/:id', title: 'Discussion', moduleId: 'discussion', nav: false }
            ];

            return this.router.makeRelative({ moduleId: 'viewmodels' }).map(routes).buildNavigationModel().activate();
        };

        Shell.prototype.search = function () {
            return _app.showMessage("Search is not implemented yet!", "Sorry");
        };
        return Shell;
    })();
    exports.Shell = Shell;

    return new Shell(_app, _router);
});
//# sourceMappingURL=shell.js.map
