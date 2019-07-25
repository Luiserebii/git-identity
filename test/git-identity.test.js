"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var assert = chai.assert;
var fs = require("fs");
var path = require("path");
var Identity = require("../src/git-identity/identity");
var GitIdentity = require("../src/git-identity/git-identity");
describe('Class Identity', function () {
    var id = {};
    var altid = {};
    beforeEach(function () {
        id.name = 'BTC';
        id.username = 'Satoshi Nakamoto';
        id.email = 'satoshin@gmx.com';
        id.gpgKey = 'MQINBF0C';
        altid.name = 'meme';
        altid.username = 'FloppyFishe';
        altid.email = 'ff@floppy.io';
        altid.gpgKey = 'A5G7BBP0';
    });
    describe('toJSON() returns expected object', function () {
        it('with name, username, email, GPG Key', function () {
            var identity = new Identity(id.name, id.username, id.email, id.gpgKey);
            var json = identity.toJSON();
            assert.ok(json[id.name].username === id.username);
            assert.ok(json[id.name].email === id.email);
            assert.ok(json[id.name].gpgKey === id.gpgKey);
        });
        it('with name, username, email, no GPG Key', function () {
            var identity = new Identity(id.name, id.username, id.email);
            var json = identity.toJSON();
            assert.ok(json[id.name].username === id.username);
            assert.ok(json[id.name].email === id.email);
            assert.isNotOk(json[id.name].gpgKey);
        });
    });
    describe('toString() returns expected string', function () {
        it('with name, username, email, GPG Key', function () {
            var identity = new Identity(id.name, id.username, id.email, id.gpgKey);
            var str = identity.toString();
            assert.ok(str.includes(id.name));
            assert.ok(str.includes(id.email));
            assert.ok(str.includes(id.gpgKey));
        });
        it('with username, email, no name or GPG Key', function () {
            var identity = new Identity(id.username, id.email);
            var str = identity.toString();
            assert.isNotOk(str.includes(id.name) && str.includes('Name:'));
            assert.ok(str.includes(id.email));
            assert.isNotOk(str.includes(id.gpgKey) && str.includes('GPG Key:'));
        });
    });
});
describe('Class GitIdentity', function () {
    var id = {};
    var altid = {};
    var folder = '';
    var file = '';
    var gitIdentity;
    var identity;
    beforeEach(function () {
        id.name = 'BTC';
        id.username = 'Satoshi Nakamoto';
        id.email = 'satoshin@gmx.com';
        id.gpgKey = 'MQINBF0C';
        altid.name = 'meme';
        altid.username = 'FloppyFishe';
        altid.email = 'ff@floppy.io';
        altid.gpgKey = 'A5G7BBP0';
        folder = path.resolve(__dirname, 'data-test');
        file = path.resolve(folder, 'identities');
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        gitIdentity = new GitIdentity(file);
        identity = new Identity(id.name, id.username, id.email, id.gpgKey);
    });
    //Clean up our test data folder
    afterEach(function () {
        if (fs.existsSync(folder)) {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
            fs.rmdirSync(folder);
        }
    });
    it('newIdentity() passes (no error on running)', function () {
        gitIdentity.newIdentity(identity);
    });
    it('getIdentities() returns expected object', function () {
        gitIdentity.newIdentity(identity);
        var json = gitIdentity.getIdentities();
        assert.ok(json[id.name].username === id.username);
        assert.ok(json[id.name].email === id.email);
        assert.ok(json[id.name].gpgKey === id.gpgKey);
    });
    it('updateIdentity() updates an identity on file', function () {
        //Create expected updated Identity object
        var updatedIdentity = new Identity(id.name, id.username, id.email, altid.gpgKey);
        //Create new identity
        gitIdentity.newIdentity(identity);
        //Get identity file as JSON before update
        var before = gitIdentity.getIdentities();
        //Update with new one
        gitIdentity.updateIdentity(updatedIdentity);
        //Check post-update
        var after = gitIdentity.getIdentities();
        assert.ok(after[id.name].username === id.username);
        assert.ok(after[id.name].email === id.email);
        assert.ok(after[id.name].gpgKey === altid.gpgKey);
    });
    it('deleteIdentity() deletes an identity on file', function () {
        //Create new identity
        gitIdentity.newIdentity(identity);
        //Get identity file as JSON before update
        var before = gitIdentity.getIdentities();
        assert.isOk(before[id.name]);
        //Delete identity
        gitIdentity.deleteIdentity(id.name);
        //Check post-delete
        var after = gitIdentity.getIdentities();
        assert.isNotOk(after[id.name]);
        assert.throws(function () { after[id.name].username; }, TypeError);
        assert.throws(function () { after[id.name].email; }, TypeError);
        assert.throws(function () { after[id.name].gpgKey; }, TypeError);
    });
});
