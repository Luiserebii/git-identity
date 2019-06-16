
'use strict';

const chai = require('chai');
const assert = chai.assert;

const Identity = require('../src/git-identity/identity');


describe('Class Identity', () => {

  describe('toJSON() returns expected object', () => {

    const id = {};

    beforeEach(() => {
      id.name = 'BTC';
      id.username = 'Satoshi Nakamoto';
      id.email = 'satoshin@gmx.com';
      id.gpgKey = 'MQINBF0C';
    })

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

    const id = {};

    beforeEach(() => {
      id.name = 'BTC';
      id.username = 'Satoshi Nakamoto';
      id.email = 'satoshin@gmx.com';
      id.gpgKey = 'MQINBF0C';
    })

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
