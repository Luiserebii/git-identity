"use strict";
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.objectIsEmpty = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
    return Util;
}());
module.exports = Util;
