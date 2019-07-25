"use strict";
/**

*/
var program = require("commander");
var chalk = require("chalk");
var figlet = require("figlet");
var Meta = require("../util/meta");
var IdentityShift = require("../git-identity/git-identity");
var Identity = require("../git-identity/identity");
var identityShift = new IdentityShift();
var meta = Meta.readMetadata();
var GitIdentityCLI = /** @class */ (function () {
    function GitIdentityCLI() {
    }
    GitIdentityCLI.prototype.run = function () {
        this.setupCLI();
        this.main();
    };
    GitIdentityCLI.prototype.setupCLI = function () {
        program.version(meta.version, '-v, --version');
        if (meta.description)
            program.description(meta.description);
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
            .on('--help', function () {
            console.log('');
            console.log('* uses additional flags below: ');
            console.log('--user, --email, --gpg-key');
        });
    };
    GitIdentityCLI.prototype.main = function () {
        program.parse(process.argv);
        if (this.argNum() === 0) {
            this.aboutCLI();
            program.help();
        }
        //If the about flag has been passed, and only that flag, show the about
        if (program.about && this.argNum() === 1) {
            this.aboutCLI();
        }
        else if (program.list && this.argNum() === 1) {
            var ids = identityShift.listIdentities();
            ids ? console.log("All registered identities: \n\n" + identityShift.listIdentities()) : console.log("No identities found!");
        }
        else if (program.new && this.argNum() >= 6) {
            identityShift.newIdentity(new Identity(program.new, program.user, program.email, program.gpgKey));
        }
        else if (program.update && this.argNum() >= 6) {
            identityShift.updateIdentity(new Identity(program.update, program.user, program.email, program.gpgKey));
        }
        else if (program.delete && this.argNum() === 2) {
            identityShift.deleteIdentity(program.delete) ? console.log("Deleted identity \"" + program.delete + "\"") : console.log("Identity not found!");
        }
        else if (program.shift && (this.argNum() === 2 || this.argNum() === 3)) {
            var name_1 = program.shift;
            if (!program.local) {
                var success = identityShift.shiftIdentity(name_1);
                if (success)
                    console.log("Shifted global git identity to: " + name_1);
            }
            else {
                var success = identityShift.shiftIdentityLocal(name_1);
                if (success)
                    console.log("Shifted local git identity to: " + name_1);
            }
        }
        else if (program.current && (this.argNum() === 1 || this.argNum() === 2)) {
            if (!program.local) {
                var identity = identityShift.getIdentityGlobal();
                console.log("Current global git identity:\n");
                console.log(identity.toString());
            }
            else {
                var identity = identityShift.getIdentityLocal();
                console.log("Current local Git identity:\n");
                console.log(identity.toString());
            }
        }
        else {
            console.log("Invalid combination of flags and/or arguments");
        }
    };
    GitIdentityCLI.prototype.aboutCLI = function () {
        //Title of tool
        console.log(chalk.green(figlet.textSync('Git Identity', { font: 'Ghost' })));
        console.log("Version: " + meta.version);
        console.log("Author: Luiserebii");
        console.log("Check me out on GitHub at: https://github.com/Luiserebii!");
    };
    GitIdentityCLI.prototype.argNum = function () {
        return process.argv.slice(2).length;
    };
    return GitIdentityCLI;
}());
module.exports = GitIdentityCLI;
