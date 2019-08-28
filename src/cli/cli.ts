/**

*/

import program = require('commander');
import chalk = require('chalk');
import figlet = require('figlet');

import Meta = require('../util/meta');
import JSONMetadata = require('../util/interfaces/json-metadata');
import GitIdentity = require('../git-identity/git-identity');
import Identity = require('../git-identity/identity');

import GitIdentityCloneOpts = require('./interfaces/git-identity-clone-opts');

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
        .option('-i, --identity', 'name of the git-identity to use')
        .action((repo, flags) => {
    
          //If we've been passed nothing, just print the help
          if(this.argNum() === 1) {
            console.log(this.getCommand("clone").help());
          } else {
            let opts: GitIdentityCloneOpts = {
              identity: flags.identity,

            }
            gitIdentity.clone(opts);
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
