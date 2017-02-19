define(["require", "exports"], function(require, exports) {
    var DateHelper = (function () {
        function DateHelper() {
        }
        DateHelper.getTimeElapsed = function (date) {
            var now = new Date(), yd, md, dd, hd, nd, sd, out = [];

            yd = now.getFullYear() - date.getFullYear();
            md = now.getMonth() - date.getMonth();
            dd = now.getDate() - date.getDate();
            hd = now.getHours() - date.getHours();
            nd = now.getMinutes() - date.getMinutes();
            sd = now.getSeconds() - date.getSeconds();

            if (md < 0) {
                yd--;
                md += 12;
            }
            if (dd < 0) {
                md--;
                dd += DateHelper.getDaysInMonth(now.getMonth() - 1, now.getFullYear());
            }
            if (hd < 0) {
                dd--;
                hd += 24;
            }
            if (nd < 0) {
                hd--;
                nd += 60;
            }
            if (sd < 0) {
                nd--;
                sd += 60;
            }

            if (yd > 0)
                return (yd + ' year' + (yd == 1 ? '' : 's'));
            if (md > 0)
                return (md + ' month' + (md == 1 ? '' : 's'));
            if (dd > 0)
                return (dd + ' day' + (dd == 1 ? '' : 's'));
            if (hd > 0)
                return (hd + ' hour' + (hd == 1 ? '' : 's'));
            if (nd > 0)
                return (nd + ' minute' + (nd == 1 ? '' : 's'));
            return (sd + ' second' + (sd == 1 ? '' : 's'));
        };

        DateHelper.getDaysInMonth = function (month, year) {
            if (typeof year == undefined)
                year = 1999;
            var currmon = new Date(year, month), nextmon = new Date(year, month + 1);
            return Math.floor((nextmon.getTime() - currmon.getTime()) / (24 * 3600 * 1000));
        };
        return DateHelper;
    })();

    
    return DateHelper;
});
//# sourceMappingURL=datehelper.js.map
