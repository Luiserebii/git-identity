/**
 *
 * IdentityShift class
 *
 */

const fs = require('fs');
const path = require('path');

class IdentityShift {



  newIdentity(name, username, email, gpgKey = null, filepath = path.resolve(__dirname, 'data')) {
    let file = path.resolve(filepath, 'identities');
    let identityStore;

    //If file exists, let's load it in before writing
    if(fs.existsSync(file)) identityStore = JSON.parse(fs.readFileSync(file));

    //Add identity to store
    identityStore.name = { 'username': username, 'email': email };
    if(gpgKey) identityStore.name.gpgKey = gpgKey;

    //Finally, write identityStore to file
    fs.writeFileSync(file, JSON.stringify(identityStore), 'utf8')

  }


}
