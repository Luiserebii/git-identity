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
    let identityStore = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : null);
    return identityStore;
  }

  newIdentity(name, username, email, gpgKey = null, file = this.file) {
    let identityStore;

    //If file exists, let's load it in before writing
    identityStore = this.getIdentities();

    //Add identity to store
    identityStore.name = { 'username': username, 'email': email };
    if(gpgKey) identityStore.name.gpgKey = gpgKey;

    //Finally, write identityStore to file
    fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')

  }

  updateIdentity(name, username, email, gpgKey = null, file = this.file) {
    

  }

}
