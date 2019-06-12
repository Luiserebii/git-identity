const chalk = require('chalk');
const figlet = require('figlet');

const run = () => {

console.log(chalk.green('uguu'));
const fug = figlet.textSync("Anal Lube", {font: 'Ghost'});
console.log(chalk.white.inverse(fug));

}

run();
