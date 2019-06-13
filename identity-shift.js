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
    let identityStore = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {});
    return identityStore;
  }

  createIdentity(name, username, email, gpgKey = null) {
    let identityStore = { name: {'username': username, 'email': email} };
    if(gpgKey) identityStore[name].gpgKey = gpgKey;
    return identityStore;

  }

  listIdentites() {
    return this.identityToString(this.getIdentities);
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

  shiftIdentity(name, file = this.file) {
    let identityStore = this.getIdentities();
    //let identity = !this.objectIsEmpty(identities) ? identities.name : null;
    let identity = identityStore[name];
    identity ? this.setIdentityGlobal(name, username, email, gpgKey) : console.log("Identity not found!")
  }

  setIdentityGlobal(name, username, email, gpgKey = null) {
    const cmd = `' '`
    child_process.execSync(cmd);
  }

/*
  objectIsEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
*/
  identityToString(identity){
    return JSON.stringify(identity);
  }
  

}
