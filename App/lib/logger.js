var Logger = (function () {
    function Logger(name) {
        this.name = name;
    }
    Logger.prototype.padZeros = function (value, length) {
        var paddy = value.toString();
        while (paddy.length < length)
            paddy = '0' + paddy;
        return paddy;
    };

    Logger.prototype.getCurrentTimestamp = function () {
        var now = new Date();
        var timestamp = now.getFullYear() + '-' + this.padZeros(now.getMonth(), 2) + '-' + this.padZeros(now.getDay(), 2) + ' ' + this.padZeros(now.getHours(), 2) + ':' + this.padZeros(now.getMinutes(), 2) + ':' + this.padZeros(now.getSeconds(), 2) + '.' + this.padZeros(now.getMilliseconds(), 3);
        return timestamp;
    };

    Logger.prototype.isLogEnabled = function () {
        return (typeof (console) != 'undefined') && (typeof (console.log) != 'undefined');
    };

    Logger.prototype.isInfoEnabled = function () {
        return this.isLogEnabled() && (typeof (console.info) != 'undefined');
    };

    Logger.prototype.isWarnEnabled = function () {
        return this.isLogEnabled() && (typeof (console.warn) != 'undefined');
    };

    Logger.prototype.isErrorEnabled = function () {
        return this.isLogEnabled() && (typeof (console.error) != 'undefined');
    };

    Logger.prototype.formatMessage = function (message) {
        return (this.name + ' | ' + this.getCurrentTimestamp() + ' | ' + message);
    };

    Logger.prototype.log = function (message) {
        if (!this.isLogEnabled())
            return;
        console.log(this.formatMessage(message));
    };

    Logger.prototype.info = function (message) {
        if (this.isInfoEnabled()) {
            console.info(this.formatMessage(message));
        } else {
            this.log(this.formatMessage('INFO: ' + message));
        }
    };

    Logger.prototype.warn = function (message) {
        if (this.isWarnEnabled()) {
            console.warn(this.formatMessage(message));
        } else {
            this.log(this.formatMessage('WARN: ' + message));
        }
    };

    Logger.prototype.error = function (message) {
        if (this.isErrorEnabled()) {
            console.info(this.formatMessage(message));
        } else {
            this.log(this.formatMessage('ERROR: ' + message));
        }
    };
    return Logger;
})();
//# sourceMappingURL=logger.js.map
