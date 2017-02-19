define(["require", "exports", 'knockout', '../model/user', '../model/rating', '../lib/datehelper'], function(require, exports, _ko, User, Rating, DateHelper) {
    var QuestionInfo = (function () {
        function QuestionInfo(_post) {
            var _this = this;
            this._post = _post;
            this.questionId = _post.Id;
            this.questionKey = _post.Key;
            this.points = new Rating(_post.Ratings.map((function (rating) {
                return rating.Score;
            })));
            this.title = _ko.protectedObservable(_post.Content.Title || this.getIdentityDisplayString());
            this.abstract = _ko.protectedObservable(_post.Content.Text || this.getIdentityDisplayString());
            this.details = _ko.protectedObservable('');
            this.argumentCount = _post.ReferredFrom ? _post.ReferredFrom.length : 0;
            this.author = new User(_post.ModifiedBy.Author.Key, _post.ModifiedBy.Author.Alias);
            this.tags = [];
            this.referredFrom = [];
            this.refersTo = [];
            this.timeElapsed = DateHelper.getTimeElapsed(_post.Modified);

            if (_post.Tags) {
                _post.Tags.forEach(function (tag) {
                    return _this.tags.push(tag.Description.Name);
                });
            }
            if (_post.ReferredFrom) {
                _post.ReferredFrom.forEach(function (reference) {
                    return _this.referredFrom.push({
                        id: reference.Id,
                        referrerId: reference.ReferrerId
                    });
                });
            }
            if (_post.RefersTo) {
                _post.RefersTo.forEach(function (reference) {
                    return _this.refersTo.push({
                        id: reference.Id,
                        referrerId: reference.ReferrerId
                    });
                });
            }
        }
        QuestionInfo.prototype.reset = function () {
            for (var property in this) {
                if (this[property].reset) {
                    this[property].reset();
                }
            }
        };

        QuestionInfo.prototype.commit = function () {
            for (var property in this) {
                if (this[property].commit) {
                    this[property].commit();
                }
            }
        };

        QuestionInfo.prototype.getIdentityDisplayString = function () {
            return 'Post # ' + this.questionKey;
        };
        return QuestionInfo;
    })();

    
    return QuestionInfo;
});
//# sourceMappingURL=questioninfo.js.map
