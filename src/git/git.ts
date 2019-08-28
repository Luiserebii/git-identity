/**

  Git class, this is meant to hold static functions which correspond to git internally, seperate out functionality relating to git vs GitIdentity class logic

*/

import Util = require('../util/util');
import GitUser = require('./interfaces/git-user');
import GitCloneOpts = require('./interfaces/git-clone-opts');
import GitReviseOpts = require('./interfaces/git-revise-opts');

import NoOldEmailOldNameError = require('./errors/no-old-email-old-name-error');
import NoNewEmailNewNameError = require('./errors/no-new-email-new-name-error');

class Git {

  static get newLine(): string {
    return `
    `;
  }

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
    if(prefixCmd) cmd = prefixCmd + " && " + cmd;
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
    if(prefixCmd) cmd = prefixCmd + " && " + cmd;
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

  static revise(opts: GitReviseOpts): boolean {

    let cmd = this.buildReviseCmd(opts);

    //Execute
    Util.exec(cmd);

    return true;
  } 

  static buildReviseCmd(opts: GitReviseOpts): string {

    let newLine: string = this.newLine;
    let cmd: string = `git filter-branch --force --env-filter '${newLine}`;

    if(!opts.oldEmail && !opts.oldName) throw new NoOldEmailOldNameError();
    if(!opts.newEmail && !opts.newName) throw new NoNewEmailNewNameError();

    //Add in vars where necessary
    if(opts.oldEmail) cmd += `OLD_EMAIL="${opts.oldEmail}"${newLine}`;
    if(opts.oldName) cmd += `OLD_NAME="${opts.oldName}"${newLine}`;
    if(opts.newEmail) cmd += `NEW_EMAIL="${opts.newEmail}"${newLine}`;
    if(opts.newName) cmd += `NEW_NAME="${opts.newName}"${newLine}`;

    let firstIf: string = "";
    let secondIf: string = "";

    let firstThen: string = "";
    let secondThen: string = "";

    if(opts.oldEmail && opts.oldName) {

      //Idea; seperate these raw strings into vars (like firstIf) and use it to construct everything at the end,
      //thus making logic checks if opts exist only once
      firstIf +=
       `if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ] && [ "$GIT_COMMITTER_NAME" = "$OLD_NAME" ]
        then${newLine}`;
      secondIf +=
       `if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ] && [ "$GIT_AUTHOR_NAME" = "$OLD_NAME" ]
        then${newLine}`;

    } else if(opts.oldEmail) {

      firstIf +=
       `if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
        then${newLine}`;
      secondIf +=
       `if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
        then${newLine}`;

    } else if(opts.oldName) {

      firstIf +=
       `if [ "$GIT_COMMITTER_NAME" = "$OLD_EMAIL" ]
        then${newLine}`;
      secondIf +=
       `if [ "$GIT_AUTHOR_NAME" = "$OLD_EMAIL" ]
        then${newLine}`;

    }

    if(opts.newEmail) {
      firstThen += 
        `   export GIT_COMMITTER_NAME="$NEW_EMAIL"${newLine}`;
      secondThen +=
        `   export GIT_AUTHOR_NAME="$NEW_NAME"${newLine}`;
    }

    if(opts.newName) {
      firstThen += 
        `   export GIT_COMMITTER_NAME="$NEW_NAME"${newLine}`;
      secondThen +=
        `   export GIT_AUTHOR_NAME="$NEW_EMAIL"${newLine}`;
    }
   
    //Close then(s)
    firstThen += `fi{$newLine}`;
    secondThen += `fi{$newLine}`;

    //Construct our conditional body
    cmd += firstIf + firstThen + secondIf + secondThen;

    //Finally, close our command
    cmd += `
      ' --tag-name-filter cat -- --branches --tags
    `;

    return cmd;
  }

}


export = Git;
