define(["require", "exports"], function(require, exports) {
    var Rating = (function () {
        function Rating(scores) {
            var _this = this;
            this.score = 0;

            scores.forEach(function (rating) {
                return _this.score += rating;
            });
        }
        return Rating;
    })();

    
    return Rating;
});
//# sourceMappingURL=rating.js.map
