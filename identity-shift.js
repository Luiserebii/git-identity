/**
 *
 * IdentityShift class
 *
 */

const fs = require('fs');
const path = require('path');

class IdentityShift {

  constructor(file = path.resolve(__dirname, 'data', 'identities')){
    this.file = file;
  }


  getIdentities(file = this.file) {
    let identityStore = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
    return identityStore;
  }

  createIdentity(name, username, email, gpgKey = null) {
    let identityStore = { name: {'username': username, 'email': email} };
    if(gpgKey) identityStore[name].gpgKey = gpgKey;
    return identityStore;

  }

  listIdentities() {
    let identityStore = this.getIdentities();
    return identityStore && !this.objectIsEmpty(identityStore) ? this.identityToString(this.getIdentities()) : null;
  }

  newIdentity(name, username, email, gpgKey = null, file = this.file) {
    let identityStore;

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();

    //Add identity to store
    if(identityStore[name]){

      identityStore = Object.assign(identityStore, this.createIdentity(name, username, email, gpgKey));

      //Finally, write identityStore to file
      fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')
    } else {
      console.log("Identity already exists!")
    }

  }

  updateIdentity(name, username, email, gpgKey = null, file = this.file) {
    let identityStore; 

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();

    //Update identity
    identityStore = Object.assign(identityStore, this.createIdentity(name, username, email, gpgKey));

    //Finally, write identityStore to file
    fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')
  }

  deleteIdentity(name, file = this.file) {
    let identityStore = this.getIdentities();
    identityStore[name] ? delete identityStore[name] : console.log("Identity not found!");
  }

  //shift identity function implementation for application flag
  shiftIdentity(name, file = this.file) {
    let identityStore = this.getIdentities();
    //let identity = !this.objectIsEmpty(identities) ? identities.name : null;
    let identity = identityStore[name];
    identity ? this.setIdentityGlobal(username, email, gpgKey) : console.log("Identity not found!")
  }

  //Set identity globally, run git commands to do so
  setIdentityGlobal(username, email, gpgKey = null) {
    const cmd = `git config --global user.name ${username} && ` +
                `git config --global user.email ${email}`;
    if(gpgKey) cmd += ` && git config --global user.signingkey ${gpgKey}`;
    child_process.execSync(cmd);
  }

  //Set identity locally
  setIdentityLocal(username, email, gpgKey = null) {
    const cmd = `git config --local user.name ${username} && ` +
                `git config --local user.email ${email}`;
    if(gpgKey) cmd += ` && git config --local user.signingkey ${gpgKey}`;
    child_process.execSync(cmd);
  }


  objectIsEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  identityToString(identity){
    return JSON.stringify(identity);
  }
  

}

module.exports = IdentityShift;
