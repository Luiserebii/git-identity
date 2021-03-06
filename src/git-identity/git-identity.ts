import fs = require('fs');
import path = require('path');
import Identity = require('./identity');
import JSONIdentityDetails = require('./interfaces/json-identity-details');
import GitIdentityCloneOpts = require('./interfaces/git-identity-clone-opts');
import GitIdentityReviseOpts = require('./interfaces/git-identity-revise-opts');
import Git = require('../git/git');
import GitUser = require('../git/interfaces/git-user');
import GitCloneOpts = require('../git/interfaces/git-clone-opts');
import GitReviseOpts = require('../git/interfaces/git-revise-opts');
import Util = require('../util/util');

/**
 * GitIdentity class
 *
 * @author Luiserebii <luis@serebii.io>
 * @description
 */
class GitIdentity {

  file: string;

  constructor(file: string = path.resolve(__dirname, '../', '../', 'data', 'identities')){
    this.file = file;
  }

  getIdentity(name: string, file: string = this.file): object | null {
    let identityStore: object = this.getIdentities(file);
    let identity: object | null = null;
    
    let keys = Object.keys(identityStore);
    for(let i = 0; i < keys.length; i++) {
      if(keys[i] === name) {
        identity = identityStore[name];
        return identity;
      }
    }
    return identity;

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
      console.log('Identity already exists!');
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
  shiftIdentity(name: string, file: string = this.file, prefixCmd: string | null = null): boolean {
    let identityStore: object = this.getIdentities(file);
    let id: JSONIdentityDetails = identityStore[name];
    if(id) {
      this.setIdentityGlobal(new Identity(name, id.username, id.email, id.gpgKey), prefixCmd); 
      return true;
    } else {
      console.log('Identity not found!');
      return false; 
    }
  }

  shiftIdentityLocal(name: string, file: string = this.file, prefixCmd: string | null = null): boolean {
    let identityStore: object = this.getIdentities(file);
    let id: JSONIdentityDetails = identityStore[name];
    if(id) {
      this.setIdentityLocal(new Identity(name, id.username, id.email, id.gpgKey), prefixCmd);
      return true;
    } else {
      console.log('Identity not found!');
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
  setIdentityGlobal(identity: Identity, prefixCmd: string | null = null): boolean {
    let gitUser: GitUser = { 'name': identity.username, 'email': identity.email, 'signingKey': identity.gpgKey };
    return Git.setUserGlobal(gitUser, prefixCmd);
  }

  //Set identity locally
  setIdentityLocal(identity: Identity, prefixCmd: string | null = null): boolean {
    let gitUser: GitUser = { 'name': identity.username, 'email': identity.email, 'signingKey': identity.gpgKey };
    return Git.setUserLocal(gitUser, prefixCmd);
  }

  clone(opts: GitIdentityCloneOpts): boolean {
    //Build opts to pass to Git.clone()
    let tempOpts: any = {};
    let keys: any[] = Object.keys(opts);
    for(let i = 0; i < keys.length; i++) {
      if(keys[i] !== 'identity') {
        tempOpts[keys[i]] = opts[keys[i]];
      }
    }
    let gitCloneOpts: GitCloneOpts = tempOpts;

    //Find dir that will be produced by clone
    let dir: string = '';
    if(!opts.repo.includes('.git')) {
      if(opts.repo.lastIndexOf('/') + 1 === opts.repo.length) {
        dir = opts.repo.substring(0, opts.repo.lastIndexOf('/'));
      }
      dir = dir.substring(dir.lastIndexOf('/') + 1);
    } else {
      dir = opts.repo.substring(opts.repo.lastIndexOf('/') + 1, opts.repo.lastIndexOf('.git') - 1);
    }

    //Clone and set identity
    let runClone = Git.clone(gitCloneOpts);
    let shiftIdentity = this.shiftIdentityLocal(opts.identity, undefined, `cd ${dir}`);
    return runClone && shiftIdentity;
  }

  revise(opts: GitIdentityReviseOpts): boolean {

    //Construct GitReviseOpts
    let oldEmail: string | null = null;
    let oldName: string | null = null;
    let newEmail: string | null = null; 
    let newName: string | null = null;

    //If we have one of these identities passed, let's load it in~
    if(opts.oldIdentity) { 
      let oldIdentity: any = this.getIdentity(opts.oldIdentity);
      if(oldIdentity) {
        oldEmail = oldIdentity.email;
        oldName = oldIdentity.username;
      } else {
        throw 'No Identity found for old identity';
      }
    }
    if(opts.newIdentity) { 
      let newIdentity: any = this.getIdentity(opts.newIdentity);
      if(newIdentity) {
        newEmail = newIdentity.email;
        newName = newIdentity.username;
      } else {
        throw 'No Identity found for new identity';
      }
    }

    let gitReviseOpts: GitReviseOpts = {
      oldEmail: opts.oldEmail || oldEmail,
      oldName: opts.oldName || oldName, 
      newEmail: opts.newEmail || newEmail,
      newName: opts.newName || newName
    };

    //Revise
    let runRevise = Git.revise(gitReviseOpts);
    return runRevise;
  } 

  identitiesToString(identities: object /*Array of Identity objects*/): string {
    let str: string = '';
    let keys: any[] /*specifically, an array*/ = Object.keys(identities);

    str += new Identity(keys[0], identities[keys[0]].username,
                        identities[keys[0]].email, identities[keys[0]].gpgKey).toString();

    for(var i = 1; i < keys.length; i++){
      str += '\n\n' + new Identity(keys[i], identities[keys[i]].username,
                                   identities[keys[i]].email, identities[keys[i]].gpgKey).toString();
    }
    return str;
  }
  

}

export = GitIdentity;
