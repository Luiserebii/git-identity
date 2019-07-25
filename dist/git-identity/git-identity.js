"use strict";
/**
 *
 * GitIdentity class
 *
 */
var fs = require("fs");
var path = require("path");
var child_process = require("child_process");
var Identity = require("./identity");
var Util = require("../util/util");
var GitIdentity = /** @class */ (function () {
    function GitIdentity(file) {
        if (file === void 0) { file = path.resolve(__dirname, '../', '../', 'data', 'identities'); }
        this.file = file;
    }
    GitIdentity.prototype.getIdentities = function (file) {
        if (file === void 0) { file = this.file; }
        var identityStore = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
        return identityStore;
    };
    GitIdentity.prototype.listIdentities = function () {
        var identityStore = this.getIdentities();
        return identityStore && !Util.objectIsEmpty(identityStore) ? this.identitiesToString(this.getIdentities()) : null;
    };
    GitIdentity.prototype.newIdentity = function (identity, file) {
        if (file === void 0) { file = this.file; }
        var identityStore;
        //If file exists, let's load it in before writing
        identityStore = this.getIdentities();
        //Add identity to store
        if (!identityStore[identity.name]) {
            identityStore = Object.assign(identityStore, identity.toJSON());
            //If we're using our default folder path, and the folder doesn't exist, make it!
            if (file === this.file && !fs.existsSync(path.resolve(file, '../')))
                fs.mkdirSync(path.resolve(file, '../'));
            //Finally, write identityStore to file
            fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8');
            return true;
        }
        else {
            console.log("Identity already exists!");
            return false;
        }
    };
    GitIdentity.prototype.updateIdentity = function (identity, file) {
        if (file === void 0) { file = this.file; }
        var identityStore;
        //If file exists, let's load it in before writing
        identityStore = this.getIdentities();
        //Update identity
        identityStore = Object.assign(identityStore, identity.toJSON());
        //Finally, write identityStore to file
        fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8');
        return true;
    };
    GitIdentity.prototype.deleteIdentity = function (name, file) {
        if (file === void 0) { file = this.file; }
        var identityStore = this.getIdentities();
        if (identityStore[name]) {
            delete identityStore[name];
            fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8');
            return true;
        }
        else {
            return false;
        }
    };
    //shift identity function implementation for application flag
    GitIdentity.prototype.shiftIdentity = function (name, file) {
        if (file === void 0) { file = this.file; }
        var identityStore = this.getIdentities();
        var id = identityStore[name];
        if (id) {
            this.setIdentityGlobal(new Identity(name, id.username, id.email, id.gpgKey));
            return true;
        }
        else {
            console.log("Identity not found!");
            return false;
        }
    };
    GitIdentity.prototype.shiftIdentityLocal = function (name, file) {
        if (file === void 0) { file = this.file; }
        var identityStore = this.getIdentities();
        var id = identityStore[name];
        if (id) {
            this.setIdentityLocal(new Identity(name, id.username, id.email, id.gpgKey));
            return true;
        }
        else {
            console.log("Identity not found!");
            return false;
        }
    };
    GitIdentity.prototype.getIdentityGlobal = function () {
        var username = child_process.execSync('git config --global user.name', { encoding: 'utf8' }).trim();
        var email = child_process.execSync('git config --global user.email', { encoding: 'utf8' }).trim();
        var gpgKey = child_process.execSync('git config --global user.signingkey', { encoding: 'utf8' }).trim();
        return new Identity(null, username, email, gpgKey);
    };
    GitIdentity.prototype.getIdentityLocal = function () {
        var username = child_process.execSync('git config --local user.name', { encoding: 'utf8' }).trim();
        var email = child_process.execSync('git config --local user.email', { encoding: 'utf8' }).trim();
        var gpgKey = child_process.execSync('git config --local user.signingkey', { encoding: 'utf8' }).trim();
        return new Identity(null, username, email, gpgKey);
    };
    //Set identity globally, run git commands to do so
    GitIdentity.prototype.setIdentityGlobal = function (identity) {
        var cmd = "git config --global user.name \"" + identity.username + "\" && " +
            ("git config --global user.email \"" + identity.email + "\"");
        if (identity.gpgKey)
            cmd += " && git config --global user.signingkey \"" + identity.gpgKey + "\"";
        child_process.execSync(cmd);
        return true;
    };
    //Set identity locally
    GitIdentity.prototype.setIdentityLocal = function (identity) {
        var cmd = "git config --local user.name \"" + identity.username + "\" && " +
            ("git config --local user.email \"" + identity.email + "\"");
        if (identity.gpgKey)
            cmd += " && git config --local user.signingkey \"" + identity.gpgKey + "\"";
        child_process.execSync(cmd);
        return true;
    };
    GitIdentity.prototype.identitiesToString = function (identities /*Array of Identity objects*/) {
        var str = '';
        var keys = Object.keys(identities);
        str += new Identity(keys[0], identities[keys[0]].username, identities[keys[0]].email, identities[keys[0]].gpgKey).toString();
        for (var i = 1; i < keys.length; i++) {
            str += "\n\n" + new Identity(keys[i], identities[keys[i]].username, identities[keys[i]].email, identities[keys[i]].gpgKey).toString();
        }
        return str;
    };
    return GitIdentity;
}());
module.exports = GitIdentity;
