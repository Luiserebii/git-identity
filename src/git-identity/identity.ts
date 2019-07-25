import JSONIdentity = require('./JSONIdentity');

class Identity {

  name: string;
  username: string;
  email: string;
  gpgKey: string;

  constructor(name: string, username: string, email: string, gpgKey: string = null){
    this.name = name;
    this.username = username;
    this.email = email;
    this.gpgKey = gpgKey;
  }

  toJSON(): JSONIdentity {
    let JSON: JSONIdentity = { [this.name]: {'username': this.username, 'email': this.email} };
    if(this.gpgKey) JSON[this.name].gpgKey = this.gpgKey;
    return JSON;
  }

  toString(): string {
    let str: string = "";
    if(this.name) { str += "Name: " + this.name + "\n" }
    str +=    "Username: " + this.username + "\n" +
              "Email: " + this.email;
    if(this.gpgKey) { str += "\nGPG Key: " + this.gpgKey }
    return str;
  }

}

export = Identity;
