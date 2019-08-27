/**

  Git class, this is meant to hold static functions which correspond to git internally, seperate out functionality relating to git vs GitIdentity class logic

*/

import child_process = require('child_process');

type GitUser {
  name: string;
  email: string;
  signingKey?: string;

}

class Git {

  /**
   *  Executes a command, returns string (trimmed by default)
   */
  static exec(cmd: string, encoding = 'utf8', noTrim: = false): string {
    let res: string = child_process.execSync(cmd, { 'encoding': encoding });
    if(!noTrim) { res = res.trim(); }

    return res;
  }

  static getUserGlobal(): GitUser {
    let name: string = child_process.execSync('git config --global user.name', { encoding: 'utf8' }).trim();
    let email: string = child_process.execSync('git config --global user.email', { encoding: 'utf8' }).trim();
    let signingKey: string = child_process.execSync('git config --global user.signingkey', { encoding: 'utf8' }).trim();
    const gitUser: GitUser = { 'name': name, 'email': email, 'signingKey': signingKey }; 
    return gitUser;
  }




}
