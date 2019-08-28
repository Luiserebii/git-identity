import JSONIdentity = require('./interfaces/json-identity');

class Identity {

  name: string | null;
  username: string;
  email: string;
  gpgKey?: string | null;

  constructor(name: string | null, username: string, email: string, gpgKey: string | null = null){
    this.name = name;
    this.username = username;
    this.email = email;
    this.gpgKey = gpgKey;
  }

  toJSON(): JSONIdentity {
    let name = this.name || ''; //coerce value to string
    let JSON: JSONIdentity = { [name]: {'username': this.username, 'email': this.email} };
    if(this.gpgKey) JSON[name].gpgKey = this.gpgKey;
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
