var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'plugins/router', 'knockout', '../lib/discoViewModel', '../viewmodels/discussion', '../model/questioninfo'], function(require, exports, router, ko, DiscoViewModel, discussionVm, QuestionInfo) {
    var Trend = (function (_super) {
        __extends(Trend, _super);
        function Trend() {
            var _this = this;
            _super.call(this);
            this.displayName = 'Trending';

            this.questions = ko.observableArray([]);

            this.discoContext.onReady(function () {
                console.debug('Data Context Ready.');

                var promise = _this.initQuestions().then(function (data) {
                    _this.isLoading(false);
                });
            });
        }
        Trend.prototype.select = function (question) {
            console.debug('Item Selected.');

            discussionVm.currentQuestion(question);

            router.activeItem(discussionVm);
            router.navigate('discussion/' + question.questionKey, { trigger: false, replace: false });
        };

        Trend.prototype.initQuestions = function () {
            var _this = this;
            console.debug('Initialize Questions..');

            var query = function (post) {
                return post.PostType.Description.Name in ['Question', 'Quintessence', 'Proposal'];
            };

            var additionalImports = ['Ratings', 'ReferredFrom', 'ModifiedBy.Author', 'Tags.Description'];

            var promise = this.loadPosts(query, null, function (data) {
                data.forEach(function (post) {
                    _this.questions.push(new QuestionInfo(post));
                });
            }, additionalImports);

            return promise;
        };
        return Trend;
    })(DiscoViewModel);

    return new Trend();
});
//# sourceMappingURL=trend.js.map
