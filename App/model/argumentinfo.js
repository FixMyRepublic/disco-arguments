var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'knockout', '../model/questioninfo'], function(require, exports, _ko, QuestionInfo) {
    var ArgumentInfo = (function (_super) {
        __extends(ArgumentInfo, _super);
        function ArgumentInfo(_question, _post) {
            var _this = this;
            _super.call(this, _post);
            this.referenceId = '-1';
            this.type = _ko.observable('');
            this.onTypeChange = null;

            if (_post.RefersTo) {
                var refersTo = _post.RefersTo.filter(function (post) {
                    return post.ReferreeId == _question.questionId;
                });

                var conArguments = refersTo.filter(function (post) {
                    return post.ReferenceTypeId == '6' || post.ReferenceTypeId == '8';
                });
                if (conArguments.length > 0) {
                    this.type('con');
                } else {
                    var proArguments = refersTo.filter(function (post) {
                        return post.ReferenceTypeId == '5' || post.ReferenceTypeId == '7';
                    });
                    if (proArguments.length > 0) {
                        this.type('pro');
                    }
                }

                var discoArguments = refersTo.filter(function (post) {
                    return post.ReferenceTypeId == '7' || post.ReferenceTypeId == '8';
                });
                if (discoArguments.length > 0) {
                    this.referenceId = discoArguments[0].Id;
                } else {
                    var generalArguments = refersTo.filter(function (post) {
                        return post.ReferenceTypeId == '2';
                    });
                    if (generalArguments.length > 0) {
                        this.referenceId = generalArguments[0].Id;
                    }
                }
            }
            this.type.subscribe(function (newValue) {
                if (_this.onTypeChange) {
                    _this.onTypeChange(_this, newValue);
                }
            });
        }
        return ArgumentInfo;
    })(QuestionInfo);

    
    return ArgumentInfo;
});
//# sourceMappingURL=argumentinfo.js.map
