
'use strict';

const chai = require('chai');
const assert = chai.assert;

const fs = require('fs');
const path = require('path');

const Identity = require('../src/git-identity/identity');
const GitIdentity = require('../src/git-identity/git-identity');
const Util = require('../src/util/util');

describe('Class Identity', () => {

  const id = {};
  const altid = {}

  beforeEach(() => {
    id.name = 'BTC';
    id.username = 'Satoshi Nakamoto';
    id.email = 'satoshin@gmx.com';
    id.gpgKey = 'MQINBF0C';

    altid.name = 'meme';
    altid.username = 'FloppyFishe';
    altid.email = 'ff@floppy.io';
    altid.gpgKey = 'A5G7BBP0';
  })


  describe('toJSON() returns expected object', () => {

    it('with name, username, email, GPG Key', () => {
      let identity = new Identity(id.name, id.username, id.email, id.gpgKey);
      let json = identity.toJSON();

      assert.ok(json[id.name].username === id.username);
      assert.ok(json[id.name].email === id.email);
      assert.ok(json[id.name].gpgKey === id.gpgKey);
    })

    it('with name, username, email, no GPG Key', () => {
      let identity = new Identity(id.name, id.username, id.email);
      let json = identity.toJSON();

      assert.ok(json[id.name].username === id.username);
      assert.ok(json[id.name].email === id.email);
      assert.isNotOk(json[id.name].gpgKey);
    })

  })

  describe('toString() returns expected string', () => {

    it('with name, username, email, GPG Key', () => {
      let identity = new Identity(id.name, id.username, id.email, id.gpgKey);
      let str = identity.toString();

      assert.ok(str.includes(id.name));
      assert.ok(str.includes(id.email));
      assert.ok(str.includes(id.gpgKey));
    })

    it('with username, email, no name or GPG Key', () => {
      let identity = new Identity(id.username, id.email);
      let str = identity.toString();

      assert.isNotOk(str.includes(id.name) && str.includes('Name:'));
      assert.ok(str.includes(id.email));
      assert.isNotOk(str.includes(id.gpgKey) && str.includes('GPG Key:'));

    })

  })


})

describe('Class GitIdentity', () => {

  let folder = '';
  let file = '';

  let gitIdentity;
  let identity;
 
  beforeEach(() => {
    folder = path.resolve(__dirname, 'data-test');
    file = path.resolve(folder, 'identities');

    if(!fs.existsSync(folder)) { fs.mkdirSync(folder); }

    gitIdentity = new GitIdentity(file);
    identity = new Identity(id.name, id.username, id.email, id.gpgKey);
  })

  it('newIdentity() passes (no error on running)', () => {
    gitIdentity.newIdentity(identity);
  })

  it('getIdentities() returns expected object', () => {
    gitIdentity.newIdentity(identity);
    let res = gitIdentity.getIdentities();
    let json = JSON.parse(res);

    assert.ok(json[id.name].username === id.username);
    assert.ok(json[id.name].email === id.email);
    assert.ok(json[id.name].gpgKey === id.gpgKey);
  })

  it('updateIdentity() updates an identity on file', () => {

    //Create expected updated Identity object
    let updatedIdentity = new Identity(id.name, id.username, id.email, altid.gpgKey);

    //Create new identity
    gitIdentity.newIdentity(identity);

    //Get identity file as JSON before update
    let before = JSON.parse(gitIdentity.getIdentities());

    //Update with new one
    gitIdentity.updateIdentity(updatedIdentity);

    //Check post-update
    let after = JSON.parse(gitIdentity.getIdentities());

    assert.ok(after[id.name].username === id.username);
    assert.ok(after[id.name].email === id.email);
    assert.ok(after[id.name].gpgKey === altid.gpgKey);

  })


  //Clean up our test data folder
  afterEach(() => {
    if(fs.existsSync(folder)) { fs.rmdirSync(folder); }
  })

})
