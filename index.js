#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');

const meta = require('./meta');
const identityshift = require('./identity-shift');
const identityShift = new identityshift();

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
    .option('-s, --shift <name>', 'shift global identity to registered identity')
    .option('--local <name>', 'set local git identity to registered identity')

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
  } else if(program.list) {
    let ids = identityShift.listIdentities(); 
    ids ? console.log(identityShift.listIdentities()) : console.log("No identities found!");
  } else if(program.new) {
    identityShift.newIdentity(program.new, program.user, program.email, program['gpg-key']);
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
