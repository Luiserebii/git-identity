/**

  Git class, this is meant to hold static functions which correspond to git internally, seperate out functionality relating to git vs GitIdentity class logic

*/

import child_process = require('child_process');
import Util = require('./util');
import GitUser = require('./git-user');

class Git {

  /**
   *  
   */
  static getUserGlobal(): GitUser {
    let name: string = Util.exec('git config --global user.name');
    let email: string = Util.exec('git config --global user.email');
    let signingKey: string = Util.exec('git config --global user.signingkey');

    const gitUser: GitUser = { 'name': name, 'email': email, 'signingKey': signingKey }; 
    return gitUser;
  }


  /**
   *  
   */
  static getUserLocal(): GitUser {
    let name: string = Util.exec('git config --local user.name');
    let email: string = Util.exec('git config --local user.email');
    let signingKey: string = Util.exec('git config --local user.signingkey');

    const gitUser: GitUser = { 'name': name, 'email': email, 'signingKey': signingKey }; 
    return gitUser;
  }

  /**
   * Set user globally, run git commands to do so
   */
  static setUserGlobal(gitUser: GitUser): boolean {
    let cmd: string = `git config --global user.name "${gitUser.name}" && ` +
                `git config --global user.email "${gitUser.email}"`;
    if(identity.gpgKey) cmd += ` && git config --global user.signingkey "${gitUser.signingKey}"`;
    Util.exec(cmd);
    return true;
  }


  /**
   * Set user locally, run git commands to do so
   */
  static setUserLocal(gitUser: GitUser): boolean {
    let cmd: string = `git config --local user.name "${gitUser.name}" && ` +
                `git config --local user.email "${gitUser.email}"`;
    if(identity.gpgKey) cmd += ` && git config --local user.signingkey "${gitUser.signingKey}"`;
    Util.exec(cmd);
    return true;
  }
}
