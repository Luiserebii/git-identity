
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

  })

})
