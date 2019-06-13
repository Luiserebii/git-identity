/**
 *
 * IdentityShift class
 *
 */

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const Identity = require('./identity');

class IdentityShift {

  constructor(file = path.resolve(__dirname, 'data', 'identities')){
    this.file = file;
  }


  getIdentities(file = this.file) {
    let identityStore = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
    return identityStore;
  }

  listIdentities() {
    let identityStore = this.getIdentities();
    return identityStore && !ObjUtil.objectIsEmpty(identityStore) ? this.identitiesToString(this.getIdentities()) : null;
  }

  newIdentity(identity, file = this.file) {
    let identityStore;

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();
    //Add identity to store
    if(!identityStore[name]){

      identityStore = Object.assign(identityStore, identity.toJSON());
      //If we're using our default folder path, and the folder doesn't exist, make it!
      if(file === this.file && !fs.existsSync(path.resolve(file, '../'))) fs.mkdirSync(path.resolve(file, '../'));

      //Finally, write identityStore to file
      fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')
    } else {
      console.log("Identity already exists!")
    }

  }

  updateIdentity(identity, file = this.file) {
    let identityStore; 

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();

    //Update identity
    identityStore = Object.assign(identityStore, identity.toJSON());

    //Finally, write identityStore to file
    fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')
  }

  deleteIdentity(name, file = this.file) {
    let identityStore = this.getIdentities();
    if(identityStore[name]) {
      delete identityStore[name]
      fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')
      console.log("Deleted identity \"" + name + "\"")
    } else { 
      console.log("Identity not found!");
    }
  }

  //shift identity function implementation for application flag
  shiftIdentity(name, file = this.file) {
    let identityStore = this.getIdentities();
    let id = identityStore[name];
    if(id) {
      this.setIdentityGlobal(new Identity(name, id.username, id.email, id.gpgKey)); 
      return true;
    } else {
      console.log("Identity not found!");
      return false; 
    }
  }

  shiftIdentityLocal(name, file = this.file) {
    let identityStore = this.getIdentities();
    let id = identityStore[name];
    if(identity) {
      this.setIdentityLocal(new Identity(name, id.username, id.email, id.gpgKey));
      return true;
    } else {
      console.log("Identity not found!");
      return false;
    }
  }


  getIdentityGlobal() {
    let username = child_process.execSync('git config --global user.name', { encoding: 'utf8' }).trim();
    let email = child_process.execSync('git config --global user.email', { encoding: 'utf8' }).trim();
    let gpgKey = child_process.execSync('git config --global user.signingkey', { encoding: 'utf8' }).trim();
    return new Identity(null, username, email, gpgKey);
  }

  //Set identity globally, run git commands to do so
  setIdentityGlobal(identity) {
    let cmd = `git config --global user.name ${identity.username} && ` +
                `git config --global user.email ${identity.email}`;
    if(identity.gpgKey) cmd += ` && git config --global user.signingkey ${identity.gpgKey}`;
    child_process.execSync(cmd);
  }

  //Set identity locally
  setIdentityLocal(identity) {
    let cmd = `git config --local user.name ${identity.username} && ` +
                `git config --local user.email ${identity.email}`;
    if(gpgKey) cmd += ` && git config --local user.signingkey ${identity.gpgKey}`;
    child_process.execSync(cmd);
  }

  identitiesToString(identities) {
    let str = '';
    let keys = Object.keys(identities);

    str += new Identity(keys[0], identities[keys[0]].username, identities[keys[0]].email, identities[keys[0]].gpgKey).toString();

    for(var i = 1; i < keys.length; i++){
      str += "\n\n" + new Identity(keys[i], identities[keys[i]].username, identities[keys[i]].email, identities[keys[i]].gpgKey).toString();
    }
    return str;
  }
  

}

class ObjUtil {

  static objectIsEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
      return false;
    }
    return true;
  }


}

module.exports = IdentityShift;
