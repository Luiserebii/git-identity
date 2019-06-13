class Identity {

  constructor(name, username, email, gpgKey = null){
    this.name = name;
    this.username = username;
    this.email = email;
    this.gpgKey = gpgKey;
  }

  toJSON() {
    let JSON = { [this.name]: {'username': username, 'email': email} };
    if(gpgKey) JSON[name].gpgKey = gpgKey;
    return JSON;
  }

  toString() {
    let str = "Name: " + this.name + "\n" +
              "Username: " + this.username + "\n" +
              "Email: " + this.email;
    if(this.gpgKey) { str += "\nGPG Key: " + this.gpgKey }
    return str;
  }

}

module.exports = Identity;
