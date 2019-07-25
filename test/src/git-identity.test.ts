
import chai = require('chai');
const assert = chai.assert;

import fs = require('fs');
import path = require('path');

import Identity = require('../../src/git-identity/identity');
import GitIdentity = require('../../src/git-identity/git-identity');
import Util = require('../../src/util/util');

import JSONIdentity = require('../../src/git-identity/JSONIdentity');

interface TestJSONIdentity {
  name: string;
  username: string;
  email: string;
  gpgKey: string;
}

describe('Class Identity', () => {

  const id: TestJSONIdentity = {
    name: 'BTC',
    username: 'Satoshi Nakamoto',
    email: 'satoshin@gmx.com',
    gpgKey: 'MQINBF0C'
  }

  const altid: TestJSONIdentity = {
    name: 'meme',
    username: 'FloppyFishe',
    email: 'ff@floppy.io',
    gpgKey: 'A5G7BBP0'
  }

  describe('toJSON() returns expected object', () => {

    it('with name, username, email, GPG Key', () => {
      let identity: Identity = new Identity(id.name, id.username, id.email, id.gpgKey);
      let json: JSONIdentity = identity.toJSON();

      assert.ok(json[id.name].username === id.username);
      assert.ok(json[id.name].email === id.email);
      assert.ok(json[id.name].gpgKey === id.gpgKey);
    })

    it('with name, username, email, no GPG Key', () => {
      let identity: Identity = new Identity(id.name, id.username, id.email);
      let json: JSONIdentity = identity.toJSON();

      assert.ok(json[id.name].username === id.username);
      assert.ok(json[id.name].email === id.email);
      assert.isNotOk(json[id.name].gpgKey);
    })

  })

  describe('toString() returns expected string', () => {

    it('with name, username, email, GPG Key', () => {
      let identity: Identity = new Identity(id.name, id.username, id.email, id.gpgKey);
      let str: string = identity.toString();

      assert.ok(str.includes(id.name));
      assert.ok(str.includes(id.email));
      assert.ok(str.includes(id.gpgKey));
    })

    it('with name, username, email, no GPG Key', () => {
      let identity: Identity = new Identity(id.name, id.username, id.email);
      let str: string = identity.toString();

      assert.isNotOk(str.includes(id.name) && str.includes('Name:'));
      assert.ok(str.includes(id.email));
      assert.isNotOk(str.includes(id.gpgKey) && str.includes('GPG Key:'));

    })

  })


})

describe('Class GitIdentity', () => {

  const id: TestJSONIdentity = {
    name: 'BTC',
    username: 'Satoshi Nakamoto',
    email: 'satoshin@gmx.com',
    gpgKey: 'MQINBF0C'
  }

  const altid: TestJSONIdentity = {
    name: 'meme',
    username: 'FloppyFishe',
    email: 'ff@floppy.io',
    gpgKey: 'A5G7BBP0'
  }

  let folder: string = '';
  let file: string = '';

  let gitIdentity: GitIdentity;
  let identity: Identity;
 
  beforeEach(() => {
    folder = path.resolve(__dirname, 'data-test');
    file = path.resolve(folder, 'identities');

    if(!fs.existsSync(folder)) { fs.mkdirSync(folder); }

    gitIdentity = new GitIdentity(file);
    identity = new Identity(id.name, id.username, id.email, id.gpgKey);
  })

  //Clean up our test data folder
  afterEach(() => {
    if(fs.existsSync(folder)) {
      if(fs.existsSync(file)) { fs.unlinkSync(file); } 
      fs.rmdirSync(folder); 
    }
  })


  it('newIdentity() passes (no error on running)', () => {
    gitIdentity.newIdentity(identity);
  })

  it('getIdentities() returns expected object', () => {
    gitIdentity.newIdentity(identity);
    let json: object = gitIdentity.getIdentities();

    assert.ok(json[id.name].username === id.username);
    assert.ok(json[id.name].email === id.email);
    assert.ok(json[id.name].gpgKey === id.gpgKey);
  })

  it('updateIdentity() updates an identity on file', () => {

    //Create expected updated Identity object
    let updatedIdentity: Identity = new Identity(id.name, id.username, id.email, altid.gpgKey);

    //Create new identity
    gitIdentity.newIdentity(identity);

    //Get identity file as JSON before update
    let before: object = gitIdentity.getIdentities();

    //Update with new one
    gitIdentity.updateIdentity(updatedIdentity);

    //Check post-update
    let after: object = gitIdentity.getIdentities();

    assert.ok(after[id.name].username === id.username);
    assert.ok(after[id.name].email === id.email);
    assert.ok(after[id.name].gpgKey === altid.gpgKey);

  })

  it('deleteIdentity() deletes an identity on file', () => {

    //Create new identity
    gitIdentity.newIdentity(identity);

    //Get identity file as JSON before update
    let before: object = gitIdentity.getIdentities();
    assert.isOk(before[id.name]);
    
    //Delete identity
    gitIdentity.deleteIdentity(id.name);

    //Check post-delete
    let after: object = gitIdentity.getIdentities();

    assert.isNotOk(after[id.name]);
    assert.throws(() => { after[id.name].username }, TypeError);
    assert.throws(() => { after[id.name].email }, TypeError);
    assert.throws(() => { after[id.name].gpgKey }, TypeError);

  })

})
