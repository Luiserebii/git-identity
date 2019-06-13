#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');

const meta = require('./meta');
const IdentityShift = require('./identity-shift');
const identityShift = new IdentityShift();
const Identity = require('./identity')

const run = () => {

  setupCLI();
  main();

}

function setupCLI() {

  program.version(meta.version, '-v, --version');
  if(meta.description) program.description(meta.description);

  program
    .option('-a, --about', 'about this tool')
    .option('-l, --list', 'list all registered identities')
    .option('-n, --new <name> *', 'add new identity')
    .option('-u, --update <name> *', 'update registered identity')
    .option('-d, --delete <name>', 'delete registered identity')
    .option('-s, --shift <name>', 'shift git identity to registered identity (global by default)')
    .option('--global', 'shift globally (option for -s)')
    .option('--local', 'shift locally (option for -s)')
    .option('-c, --current', 'current global git identity')

    .option('--user <username>', 'specify username')
    .option('--email <email>', 'specify email')
    .option('--gpg-key <gpg-key>', 'specify GPG key (key-id format: LONG)')
 
    .on('--help', () => {
      console.log('');
      console.log('* uses additional flags below: ');
      console.log('--user, --email, --gpg-key');
    })
}

function main() {

  program.parse(process.argv);
  if(argNum() === 0) {
    aboutCLI();
    program.help();
  }

  //If the about flag has been passed, and only that flag, show the about
  if(program.about && argNum() === 1) { 

    aboutCLI();

  } else if(program.list && argNum() === 1) {

    let ids = identityShift.listIdentities(); 
    ids ? console.log("List of identities: \n\n" + identityShift.listIdentities()) : console.log("No identities found!");

  } else if(program.new && argNum() >= 6) {
    identityShift.newIdentity(new Identity(program.new, program.user, program.email, program.gpgKey));

  } else if(program.update && argNum() >= 6) {
    identityShift.updateIdentity(new Identity(program.update, program.user, program.email, program.gpgKey));

  } else if(program.delete && argNum() === 1) {
    identityShift.deleteIdentity(program.delete);

  } else if(program.shift && (argNum() == 2 || argNum() == 3)) {

    let name = program.shift;
    if(!program.local) {
      let success = identityShift.shiftIdentity(name);
      if(success) console.log("Shifted global git identity to: " + name);
    } else {
      let success = identityShift.shiftIdentityLocal(name);
      if(success) console.log("Shifted local git identity to: " + name);
    }

  } else if(program.current && argNum() === 1) {

    let identity = identityShift.getIdentityGlobal();
    console.log("Current global Git identity:\n");
    console.log(identity.toString());

  } else {
    console.log("Invalid combination of flags and/or arguments");
  }
  

}

function aboutCLI() {

  //Title of tool
  console.log(chalk.green(figlet.textSync('Identity Shift', { font: 'Ghost' })))
  console.log("Version: " + meta.version);
  console.log("Author: Luiserebii");
  console.log("Check me out on GitHub at: https://github.com/Luiserebii!")

}

function argNum() {
  return process.argv.slice(2).length;
}

run();
