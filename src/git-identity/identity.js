'use strict';

class Identity {

  constructor(name, username, email, gpgKey = null){
    this.name = name;
    this.username = username;
    this.email = email;
    this.gpgKey = gpgKey;
  }

  toJSON() {
    let JSON = { [this.name]: {'username': this.username, 'email': this.email} };
    if(this.gpgKey) JSON[this.name].gpgKey = this.gpgKey;
    return JSON;
  }

  toString() {
    let str = "";
    if(this.name) { str += "Name: " + this.name + "\n" }
    str +=    "Username: " + this.username + "\n" +
              "Email: " + this.email;
    if(this.gpgKey) { str += "\nGPG Key: " + this.gpgKey }
    return str;
  }

}

module.exports = Identity;
