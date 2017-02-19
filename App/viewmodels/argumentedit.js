define(["require", "exports", 'durandal/app', 'knockout'], function(require, exports, _app, _ko) {
    var ArgumentEdit = (function () {
        function ArgumentEdit() {
            this.currentArgument = null;
            this.displayName = 'ArgumentEdit';
        }
        ArgumentEdit.prototype.canActivate = function () {
            return true;
        };

        ArgumentEdit.prototype.activate = function (argument) {
            this.currentArgument = _ko.observable(argument);

            return true;
        };

        ArgumentEdit.prototype.save = function () {
            var argument = this.currentArgument();
            var title = argument.title.tempValue();
            if (!title || (argument.getIdentityDisplayString() == title)) {
                _app.showMessage('Invalid title! Please enter a descriptive title for this argument.', 'Input Validation');
                return false;
            }

            argument.commit();
            return _app.closeDialog(this, argument);
        };

        ArgumentEdit.prototype.cancel = function () {
            this.currentArgument().reset();
            return _app.closeDialog(this);
        };
        return ArgumentEdit;
    })();
    exports.ArgumentEdit = ArgumentEdit;

    return new ArgumentEdit();
});
//# sourceMappingURL=argumentedit.js.map
