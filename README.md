# git-identity
A command line tool allowing for easy shifting between git identities (username, email, and GPG).

## Usage

                     .-') _                  _ .-') _     ('-.       .-') _  .-') _           .-') _                       .-')    ('-. .-.                     .-') _    
                    (  OO) )                ( (  OO) )  _(  OO)     ( OO ) )(  OO) )         (  OO) )                     ( OO ). ( OO )  /                    (  OO) )   
  ,----.     ,-.-') /     '._         ,-.-') \     .'_ (,------.,--./ ,--,' /     '._ ,-.-') /     '._  ,--.   ,--.      (_)---\_),--. ,--.  ,-.-')    ,------./     '._  
 '  .-./-')  |  |OO)|'--...__)        |  |OO),`'--..._) |  .---'|   \ |  |\ |'--...__)|  |OO)|'--...__)  \  `.'  /       /    _ | |  | |  |  |  |OO)('-| _.---'|'--...__) 
 |  |_( O- ) |  |  \'--.  .--'        |  |  \|  |  \  ' |  |    |    \|  | )'--.  .--'|  |  \'--.  .--'.-')     /        \  :` `. |   .|  |  |  |  \(OO|(_\    '--.  .--' 
 |  | .--, \ |  |(_/   |  |           |  |(_/|  |   ' |(|  '--. |  .     |/    |  |   |  |(_/   |  |  (OO  \   /          '..`''.)|       |  |  |(_//  |  '--.    |  |    
(|  | '. (_/,|  |_.'   |  |          ,|  |_.'|  |   / : |  .--' |  |\    |     |  |  ,|  |_.'   |  |   |   /  /\_        .-._)   \|  .-.  | ,|  |_.'\_)|  .--'    |  |    
 |  '--'  |(_|  |      |  |         (_|  |   |  '--'  / |  `---.|  | \   |     |  | (_|  |      |  |   `-./  /.__)       \       /|  | |  |(_|  |     \|  |_)     |  |    
  `------'   `--'      `--'           `--'   `-------'  `------'`--'  `--'     `--'   `--'      `--'     `--'             `-----' `--' `--'  `--'      `--'       `--'    
Version: 0.0.1
Author: Luiserebii
Check me out on GitHub at: https://github.com/Luiserebii!
Usage: index [options]

A command line tool allowing for easy shifting between git identities (username, email, and GPG).

Options:
  -v, --version          output the version number
  -a, --about            about this tool
  -l, --list             list all registered identities
  -n, --new <name> *     add new identity
  -u, --update <name> *  update registered identity
  -d, --delete <name>    delete registered identity
  -s, --shift <name>     shift git identity to registered identity (global by default)
  -c, --current          current global git identity
  --global               global (option for -s and -c)
  --local                local (option for -s and -c)
  --user <username>      specify username
  --email <email>        specify email
  --gpg-key <gpg-key>    specify GPG key (key-id format: LONG)
  -h, --help             output usage information

* uses additional flags below: 
--user, --email, --gpg-key


identityshift -n --new (add an identity)
  -u --username (username)
  -e --email (email)
  --ssh (ssh hash)

identityshift -u --update (update an identity)
  -u --username (username)
  (if exists...)
    -e --email (email)
    --ssh (ssh hash)

identityshift -d --delete [username]

identityshift -s --shift <username> (shift to username)

identityshift -l --list (list all identities)

identityshift --local <username> (set local git identity to username)

[ADD REGEX DOWN THE LINE]
[IF NO OPTIONS SPECIFIED, PROMPT USER]
