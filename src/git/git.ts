/**

  Git class, this is meant to hold static functions which correspond to git internally, seperate out functionality relating to git vs GitIdentity class logic

*/

import Util = require('../util/util');
import GitUser = require('./interfaces/git-user');
import GitCloneOpts = require('./interfaces/git-clone-opts');

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
  static setUserGlobal(gitUser: GitUser, prefixCmd: string | null = null): boolean {
    let cmd: string = `git config --global user.name "${gitUser.name}" && ` +
                `git config --global user.email "${gitUser.email}"`;
    if(gitUser.signingKey) cmd += ` && git config --global user.signingkey "${gitUser.signingKey}"`;
    if(prefixCmd) cmd = prefixCmd + " " + cmd;
    Util.exec(cmd);
    return true;
  }


  /**
   * Set user locally, run git commands to do so
   */
  static setUserLocal(gitUser: GitUser, prefixCmd: string | null = null): boolean {
    let cmd: string = `git config --local user.name "${gitUser.name}" && ` +
                `git config --local user.email "${gitUser.email}"`;
    if(gitUser.signingKey) cmd += ` && git config --local user.signingkey "${gitUser.signingKey}"`;
    if(prefixCmd) cmd = prefixCmd + " " + cmd;
    Util.exec(cmd);
    return true;
  }


  /**
   * Simple function encompassing git clone command
   */
  static clone(opts: GitCloneOpts): boolean {
    let cmd: string = "git clone"; //Define the base comand here

    //Check all of the possible options for git clone
    if(opts.repo) cmd += ` ${opts.repo}`;
    if(opts.verbose) cmd += " -v";
    if(opts.quiet) cmd += " -q";
    if(opts.progress) cmd += " --progress";
    if(opts.noCheckout) cmd += " --no-checkout";
    if(opts.bare) cmd += " --bare";
    if(opts.mirror) cmd += " --mirror";
    if(opts.local) cmd += " -l";
    if(opts.noHardlinks) cmd += " --no-hardlinks";
    if(opts.shared) cmd += " -s";
    if(opts.recursive) cmd += " --recursive";
    if(opts.recurseSubmodules) cmd += " --recurse-submodules";
    if(opts.template) cmd += ` --template ${opts.template}`;
    if(opts.reference) cmd += ` --reference ${opts.reference}`;
    if(opts.dissociate) cmd += " --dissociate";
    if(opts.origin) cmd += ` -o ${opts.origin}`;
    if(opts.branch) cmd += ` -b ${opts.branch}`;
    if(opts.uploadPack) cmd += ` -u ${opts.uploadPack}`;
    if(opts.depth) cmd += ` --depth ${opts.depth}`;
    if(opts.singleBranch) cmd += " --single-branch";
    if(opts.seperateGitDir) cmd += ` --seperate-git-dir ${opts.seperateGitDir}`;
    if(opts.config) cmd += ` -c ${opts.config}`;

    //Execute
    Util.exec(cmd);
   
    return true;
  }

}

export = Git;
