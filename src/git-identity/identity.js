"use strict";
var Identity = /** @class */ (function () {
    function Identity(name, username, email, gpgKey) {
        if (gpgKey === void 0) { gpgKey = null; }
        this.name = name;
        this.username = username;
        this.email = email;
        this.gpgKey = gpgKey;
    }
    Identity.prototype.toJSON = function () {
        var _a;
        var name = this.name || ''; //coerce value to string
        var JSON = (_a = {}, _a[name] = { 'username': this.username, 'email': this.email }, _a);
        if (this.gpgKey)
            JSON[name].gpgKey = this.gpgKey;
        return JSON;
    };
    Identity.prototype.toString = function () {
        var str = "";
        if (this.name) {
            str += "Name: " + this.name + "\n";
        }
        str += "Username: " + this.username + "\n" +
            "Email: " + this.email;
        if (this.gpgKey) {
            str += "\nGPG Key: " + this.gpgKey;
        }
        return str;
    };
    return Identity;
}());
module.exports = Identity;
