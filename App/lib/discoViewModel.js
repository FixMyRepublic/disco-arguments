define(["require", "exports", 'durandal/app', 'knockout', 'disco'], function(require, exports, _app, _ko, _disco) {
    var DiscoViewModel = (function () {
        function DiscoViewModel(discoUri) {
            this.parameters = null;
            this.discoContext = null;
            console.debug('ViewModel Create.');

            this.exceptions = _ko.observableArray([]);
            this.isLoading = _ko.observable(true);

            if (!discoUri || ('' == discoUri)) {
                //discoUri = 'http://disco-node.local:3000/api/odata';
                //discoUri = 'http://dev.disco-network.local/api/odata';
                discoUri = 'http://dev.xx';
            }

            this.discoContext = new _disco.Context(discoUri);

            this.exceptions.subscribe(function (newValue) {
                _app.showMessage(newValue.shift(), "An error occured!");
            });
        }
        DiscoViewModel.prototype.activate = function (parameters) {
            console.debug('ViewModel Activate. URL parameters [' + JSON.stringify(parameters) + ']');

            this.parameters = parameters;

            return true;
        };

        DiscoViewModel.prototype.onError = function (error) {
            this.isLoading(false);

            console.error(error);

            var message = 'The page might be in an inconsitent state. Please reload the page to prevent loss of data. ' + error;
            this.exceptions.push(message);
        };

        DiscoViewModel.prototype.loadPosts = function (query, args, callback, additionalIncludes) {
            var _this = this;
            var posts = this.discoContext.Posts;

            var includes = ['Content'];
            if (additionalIncludes)
                jQuery.merge(includes, additionalIncludes);

            includes.forEach(function (property) {
                return posts = posts.include(property);
            });

            posts = posts.filter(query, args);

            var promise = posts.toArray().then(function (data) {
                console.debug('Load Posts: Data Arrived.');

                if (callback) {
                    console.debug('Load Posts: Execute Callback.');
                    callback(data);
                }
            }).fail(function (error) {
                _this.onError(error);
            });

            return promise;
        };
        return DiscoViewModel;
    })();

    
    return DiscoViewModel;
});
//# sourceMappingURL=discoViewModel.js.map
