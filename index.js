#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');

const info = require('./data');

const run = () => {

  setupCLI();
  program.parse(process.argv);
  console.log(program.ass)
 

}

function setupCLI() {

  program.version(info.version, '-v, --version')

  program
    .option('-a, --ass <number>', 'integer argument')
    .option('-m, --meme', 'uguu')

}

function aboutCLI() {

  //Title of tool
  console.log(chalk.green(figlet.textSync('Identity Shift', { font: 'Ghost' })))



}


aboutCLI();
run();
