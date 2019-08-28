/**

*/

import program = require('commander');
import chalk = require('chalk');
import figlet = require('figlet');

import Meta = require('../util/meta');
import JSONMetadata = require('../util/interfaces/json-metadata');
import GitIdentity = require('../git-identity/git-identity');
import Identity = require('../git-identity/identity');

import Git = require('../git/git');
import GitReviseOpts = require('../git/interfaces/git-revise-opts');

import GitIdentityCloneOpts = require('../git-identity/interfaces/git-identity-clone-opts');

const gitIdentity: GitIdentity = new GitIdentity();
const meta: JSONMetadata = Meta.readMetadata();

class GitIdentityCLI {

  run(): void {

    //Setup our CLI via defining commander
    this.setupCLI();
    
    //Check to see that none of our sub-commands are being called
    let isMain: boolean = true;
    for(let i = 0; i < process.argv.length; i++){
      if(this.isCommand(process.argv[i])) {
        isMain = false;
        break;
      }
    }

    //Finally, execute main() if we're on main:
    if(isMain){
      this.main();
    }

  }

  setupCLI(): void {

    program.version(meta.version, '-v, --version');
    if(meta.description) program.description(meta.description);

    program
      .option('-a, --about', 'about this tool')
      .option('-l, --list', 'list all registered identities')
      .option('-n, --new <name> *', 'add new identity')
      .option('-u, --update <name> *', 'update registered identity')
      .option('-d, --delete <name>', 'delete registered identity')
      .option('-s, --shift <name>', 'shift git identity to registered identity (global by default)')
      .option('-c, --current', 'current global git identity')
      .option('--global', 'global (option for -s and -c)')
      .option('--local', 'local (option for -s and -c)')

      .option('--user <username>', 'specify username')
      .option('--email <email>', 'specify email')
      .option('--gpg-key <gpg-key>', 'specify GPG key (key-id format: LONG)')
      .on('--help', () => {
        console.log('');
        console.log('* uses additional flags below: ');
        console.log('--user, --email, --gpg-key');
      })
    ;

    program 
      .command('clone [repo]')
        .description('Clone a repository and set the identity locally within. All flags accepted by git clone can also be used with this tool, and more information on their usage can be found within the git-scm documentation.')
        .option('-i, --identity <name>', 'name of the git-identity to use')
        .option('-v, --verbose', 'be more verbose')
        .option('-q, --quiet', 'be more quiet')
        .option('--progress', 'force progress reporting')
        .option('-n, --no-checkout', 'don\'t create a checkout')
        .option('--bare', 'create a bare repository')
        .option('--mirror', 'create a mirror repository (implies bare)')
        .option('-l, --local', 'to clone from a local repository')
        .option('--no-hardlinks', 'don\'t use local hardlinks, always copy')
        .option('-s, --shared', 'setup as shared repository')
        .option('--recursive', 'initialize submodules in the clone')
        .option('--recurse-submodules', 'initialize submodules in the clone')
        .option('--template <template-directory>', 'directory from which templates will be used')
        .option('--reference <repo>', 'reference repository')
        .option('--dissociate', 'use --reference only while cloning')
        .option('-o, --origin <name>', 'use <name> instead of \'origin\' to track upstream')
        .option('-b, --branch <branch>', 'checkout <branch> instead of the remote\'s HEAD')
        .option('-u, --upload-pack <path>', 'path to git-upload-pack on the remote')
        .option('--depth <depth>', 'create a shallow clone of that depth')
        .option('--single-branch', 'clone only one branch, HEAD or --branch')
        .option('--separate-git-dir <gitdir>', 'separate git dir from working tree')
        .option('-c, --config <key=value>', 'set config inside the new repository')

        .action((repository, flags) => {
    
          //If we've been passed nothing, just print the help
          if(this.argNum() === 1) {
            console.log(this.getCommand("clone").help());
          } else if (!repository) {
            console.log("You must specify a repository to clone.");
          } else {
            let opts: GitIdentityCloneOpts = {
              identity: flags.identity,
              repo: repository,
              verbose: flags.verbose ? true : false,
              quiet: flags.quiet ? true : false,
              progress: flags.progress ? true : false,
              noCheckout: flags.noCheckout ? true : false,
              bare: flags.bare ? true : false,
              mirror: flags.mirror ? true : false,
              local: flags.local ? true : false,
              noHardlinks: flags.noHardlinks ? true : false,
              shared: flags.shared ? true : false,
              recursive: flags.recursive ? true : false,
              recurseSubmodules: flags.recurseSubmodules ? true : false,
              template: flags.template ? flags.template : null,
              reference: flags.reference ? flags.reference : null,
              dissociate: flags.dissociate ? true : false,
              origin: flags.origin ? flags.origin : null,
              branch: flags.branch ? flags.branch : null,
              uploadPack: flags.uploadPack ? flags.uploadPack : null,
              depth: flags.depth ? flags.depth : null,
              singleBranch: flags.singleBranch ? true : false,
              seperateGitDir: flags.seperateGitDir ? flags.seperateGitDir : null,
              config: flags.config ? flags.config : null
            }
            gitIdentity.clone(opts);
          }

        })
    ;

    program 
      .command('revise')
        .description('Revise the current git repository\'s history.')
        .option('--debug', 'debug mode - print the command that will be run')
        .option('--old-email <email>', 'email to change')
        .option('--old-name <name>', 'name to change')
        .option('--new-email <email>', 'new email to change to')
        .option('--new-name <name>', 'new name to change to')
        .action((flags) => {

          let opts: GitReviseOpts = {
            oldEmail: flags.oldEmail,
            oldName: flags.oldName,
            newEmail: flags.newEmail,
            newName: flags.newName
          }
          if (!flags.debug) {
            Git.revise(opts);
          } else {
            let cmd: string = Git.buildReviseCmd(opts);
            console.log(cmd);
          }
        })
    ;

    program.parse(process.argv);
  }



  main(): void {

    if(this.argNum() === 0) {
      this.aboutCLI();
      program.help();
    }

    //If the about flag has been passed, and only that flag, show the about
    if(program.about && this.argNum() === 1) { 

      this.aboutCLI();

    } else if(program.list && this.argNum() === 1) {

      let ids = gitIdentity.listIdentities(); 
      ids ? console.log("All registered identities: \n\n" + gitIdentity.listIdentities()) : console.log("No identities found!");

    } else if(program.new && this.argNum() >= 6) {
      gitIdentity.newIdentity(new Identity(program.new, program.user, program.email, program.gpgKey));

    } else if(program.update && this.argNum() >= 6) {
      gitIdentity.updateIdentity(new Identity(program.update, program.user, program.email, program.gpgKey));

    } else if(program.delete && this.argNum() === 2) {
      gitIdentity.deleteIdentity(program.delete) ? console.log("Deleted identity \"" + program.delete + "\"") : console.log("Identity not found!");

    } else if(program.shift && (this.argNum() === 2 || this.argNum() === 3)) {

      let name = program.shift;
      if(!program.local) {
        let success = gitIdentity.shiftIdentity(name);
        if(success) console.log("Shifted global git identity to: " + name);
      } else {
        let success = gitIdentity.shiftIdentityLocal(name);
        if(success) console.log("Shifted local git identity to: " + name);
      }

    } else if(program.current && (this.argNum() === 1 || this.argNum() === 2)) {

      if(!program.local) {
        let identity = gitIdentity.getIdentityGlobal();
        console.log("Current global git identity:\n");
        console.log(identity.toString());
      } else {
        let identity = gitIdentity.getIdentityLocal();
        console.log("Current local Git identity:\n");
        console.log(identity.toString());

      }

    } else {
      console.log(program.clone);
      console.log("Invalid combination of flags and/or arguments");
    }
  

  }

  aboutCLI(): void {

    //Title of tool
    // @ts-ignore
    console.log(chalk.green(figlet.textSync('Git Identity', { font: 'Ghost' })));
    console.log("Version: " + meta.version);
    console.log("Author: Luiserebii");
    console.log("Check me out on GitHub at: https://github.com/Luiserebii!")

  }

  argNum(): number {
    return process.argv.slice(2).length;
  }

  getCommand(str: string): any {
    for(let c of program.commands){
      if(str === c._name) return c;
    }
  }

  isCommand(str: string): boolean {
    let bool: boolean = false;
    for(let c of program.commands) { 
      if(str === c._name) bool = true;
    }
    
    return bool;
  }

}

export = GitIdentityCLI;
