var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'durandal/app', 'knockout', '../lib/discoViewModel', '../model/questioninfo', '../model/argumentinfo'], function(require, exports, _app, _ko, DiscoViewModel, QuestionInfo, ArgumentInfo) {
    var Discussion = (function (_super) {
        __extends(Discussion, _super);
        function Discussion() {
            var _this = this;
            _super.call(this);
            this.displayName = 'Discussion';
            this.droppable = {
                accept: '.argument_general',
                hoverClass: 'hovered',
                activeClass: 'activeDrop',
                activate: function (event, ui) {
                    jQuery('span.click').hide();
                    jQuery('span.drag').show();
                },
                deactivate: function (event, ui) {
                    jQuery('span.drag').hide();
                    jQuery('span.click').show();
                },
                drop: function (event, ui) {
                    var newType = jQuery(event.target).hasClass('button_new_argument_pro') ? 'pro' : 'con';
                    var context = ui.draggable.data('bindingContext');

                    window.setTimeout(function () {
                        return context.$data.type(newType);
                    }, 0);
                }
            };
            this.draggable = {
                containment: '#view',
                cursor: 'move',
                helper: 'clone',
                zIndex: 100,
                opacity: .5,
                revert: 'invalid'
            };
            this.changeArgumentAssignment = null;
            this.updateArgumentContent = null;
            this.editArgument = null;
            this.resetArgument = null;

            this.changeArgumentAssignment = function (argument, data) {
                var typeId = (data == '') ? '2' : (data == 'pro') ? '7' : '8';

                var reference = new Disco.Ontology.PostReference();
                reference.Id = argument.referenceId;

                try  {
                    _this.discoContext.PostReferences.attach(reference);
                } catch (error) {
                    _this.onError(error);
                }

                reference.ReferenceTypeId = typeId;

                _this.discoContext.saveChanges().fail(function (error) {
                    _this.onError(error);
                });
            };

            this.updateArgumentContent = function (data) {
                if (!data) {
                    return;
                }

                var questionId = null;
                var result = _this.discoContext.Posts.filter(function (post) {
                    return post.Id == questionId;
                }, { questionId: data.questionId }).include('Content').toArray();

                result.then(function (posts) {
                    posts.forEach(function (post) {
                        try  {
                            _this.discoContext.Content.attach(post.Content);

                            post.Content.Title = data.title();
                            post.Content.Text = data.abstract();
                        } catch (error) {
                            _this.onError(error);
                        }
                    });

                    _this.discoContext.saveChanges().fail(function (error) {
                        _this.onError(error);
                    });
                });
            };

            this.editArgument = function (argument) {
                _app.showDialog('viewmodels/argumentedit', argument).then(function (data) {
                    _this.updateArgumentContent(data);
                });
            };

            this.resetArgument = function (argument) {
                argument.type('');
            };

            this.currentQuestion = _ko.observable();
            this.currentRelated = _ko.observableArray();
        }
        Discussion.prototype.canActivate = function () {
            var canActivate = (null == this.parameters);
            return canActivate;
        };

        Discussion.prototype.activate = function (parameters) {
            var _this = this;
            _super.prototype.activate.call(this, parameters);

            if (!this.currentQuestion()) {
                console.debug('Data not initialized yet.');
                var promise = this.initDiscussion(parameters).then(function (data) {
                    _this.initReferrers();
                }).then(function (data) {
                    _this.isLoading(false);
                });
            } else {
                this.initReferrers();
            }

            return true;
        };

        Discussion.prototype.initDiscussion = function (questionKey) {
            var _this = this;
            var questions = _ko.observableArray();

            var key;
            var query = function (post) {
                return post.Key == key;
            };

            var promise = this.loadQuestions(questions, query, { key: questionKey }, function (data) {
                return new QuestionInfo(data);
            }).then(function (ignore) {
                _this.currentQuestion(questions()[0]);
            });

            return promise;
        };

        Discussion.prototype.initReferrers = function () {
            var _this = this;
            var referrers;
            var query = function (post) {
                return post.Id in referrers;
            };

            var promise = this.loadQuestions(this.currentRelated, query, { referrers: this.getReferrers(this.currentQuestion().referredFrom) }, function (data) {
                return _this.argumentInfoFactory(data);
            }).then(function (ignore) {
            });

            return promise;
        };

        Discussion.prototype.argumentInfoFactory = function (post) {
            var argumentInfo = new ArgumentInfo(this.currentQuestion(), post);
            argumentInfo.onTypeChange = this.changeArgumentAssignment;
            return argumentInfo;
        };

        Discussion.getBoolean = function () {
            return true;
        };

        Discussion.prototype.getReferrers = function (referrerInfos) {
            return referrerInfos.length == 0 ? ['-1'] : referrerInfos.map(function (value) {
                return value.referrerId;
            });
        };

        Discussion.prototype.loadQuestions = function (questions, query, args, entityFactory) {
            questions([]);

            var additionalImports = ['RefersTo', 'Ratings', 'ReferredFrom', 'ModifiedBy.Author', 'Tags.Description'];

            var promise = this.loadPosts(query, args, function (data) {
                data.forEach(function (post) {
                    questions.push(entityFactory(post));
                });
            }, additionalImports);

            return promise;
        };
        return Discussion;
    })(DiscoViewModel);
    exports.Discussion = Discussion;

    return new Discussion();
});
//# sourceMappingURL=discussion.js.map
