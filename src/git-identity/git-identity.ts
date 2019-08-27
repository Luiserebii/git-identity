/**
 *
 * GitIdentity class
 *
 */

import fs = require('fs');
import path = require('path');
import Identity = require('./identity');
import JSONIdentityDetails = require('./JSONIdentityDetails');
import Git = require('../git/git');
import GitUser = require('../git/git-user');
import Util = require('../util/util');

class GitIdentity {

  file: string;

  constructor(file: string = path.resolve(__dirname, '../', '../', 'data', 'identities')){
    this.file = file;
  }

  getIdentities(file: string = this.file): object {
    let identityStore: object = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
    return identityStore;
  }

  listIdentities(): string | null {
    let identityStore: object = this.getIdentities();
    return identityStore && !Util.objectIsEmpty(identityStore) ? this.identitiesToString(this.getIdentities()) : null;
  }

  newIdentity(identity: Identity, file: string = this.file): boolean {
    let identityStore: object;

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();
    //Add identity to store
    if(identity.name && !identityStore[identity.name]){

      identityStore = Object.assign(identityStore, identity.toJSON());
      //If we're using our default folder path, and the folder doesn't exist, make it!
      if(file === this.file && !fs.existsSync(path.resolve(file, '../'))) fs.mkdirSync(path.resolve(file, '../'));

      //Finally, write identityStore to file
      fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8');
  
      return true;
    } else {
      console.log("Identity already exists!");
      return false;
    }

  }

  updateIdentity(identity: Identity, file: string = this.file): boolean {
    let identityStore: object; 

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();

    //Update identity
    identityStore = Object.assign(identityStore, identity.toJSON());

    //Finally, write identityStore to file
    fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8');
 
    return true;
  }

  deleteIdentity(name: string, file: string = this.file): boolean {
    let identityStore: object/*Identity[]; attempt typing this later*/ = this.getIdentities();
    if(identityStore[name]) {
      delete identityStore[name]
      fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8');
      return true;
    } else { 
      return false;
    }
  }

  //shift identity function implementation for application flag
  shiftIdentity(name: string, file: string = this.file): boolean {
    let identityStore: object = this.getIdentities();
    let id: JSONIdentityDetails = identityStore[name];
    if(id) {
      this.setIdentityGlobal(new Identity(name, id.username, id.email, id.gpgKey)); 
      return true;
    } else {
      console.log("Identity not found!");
      return false; 
    }
  }

  shiftIdentityLocal(name: string, file: string = this.file): boolean {
    let identityStore: object = this.getIdentities();
    let id: JSONIdentityDetails = identityStore[name];
    if(id) {
      this.setIdentityLocal(new Identity(name, id.username, id.email, id.gpgKey));
      return true;
    } else {
      console.log("Identity not found!");
      return false;
    }
  }


  getIdentityGlobal(): Identity {
    let gitUser: GitUser = Git.getUserGlobal();
    return new Identity(null, gitUser.name, gitUser.email, gitUser.signingKey);
  }

  getIdentityLocal(): Identity {
    let gitUser: GitUser = Git.getUserLocal();
    return new Identity(null, gitUser.name, gitUser.email, gitUser.signingKey);
  }

  //Set identity globally, run git commands to do so
  setIdentityGlobal(identity: Identity): boolean {
    let gitUser: GitUser = { 'name': identity.username, 'email': identity.email, 'signingKey': identity.gpgKey };
    return Git.setUserGlobal(gitUser);
  }

  //Set identity locally
  setIdentityLocal(identity: Identity): boolean {
    let gitUser: GitUser = { 'name': identity.username, 'email': identity.email, 'signingKey': identity.gpgKey };
    return Git.setUserGlobal(gitUser);
  }

  identitiesToString(identities: object /*Array of Identity objects*/): string {
    let str: string = '';
    let keys: any[] /*specifically, an array*/ = Object.keys(identities);

    str += new Identity(keys[0], identities[keys[0]].username, identities[keys[0]].email, identities[keys[0]].gpgKey).toString();

    for(var i = 1; i < keys.length; i++){
      str += "\n\n" + new Identity(keys[i], identities[keys[i]].username, identities[keys[i]].email, identities[keys[i]].gpgKey).toString();
    }
    return str;
  }
  

}

export = GitIdentity;
