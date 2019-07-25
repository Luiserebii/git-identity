"use strict";
/**
 * Meta class for metadata, or general configurable information on tool here pulled from package.json
 *
 */
var fs = require("fs");
var path = require("path");
var Meta = /** @class */ (function () {
    function Meta() {
    }
    Meta.readMetadata = function (file) {
        if (file === void 0) { file = path.resolve(__dirname, '../', '../', 'package.json'); }
        var packageJSON = fs.readFileSync(file, 'utf8');
        var metadata = JSON.parse(packageJSON); //No need to parse this manually, let's just give it as it is
        return metadata;
    };
    return Meta;
}());
module.exports = Meta;
