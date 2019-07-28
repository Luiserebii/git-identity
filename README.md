# git-identity
[![npm version](https://badge.fury.io/js/%40luiserebii%2Fgit-identity.svg)](https://badge.fury.io/js/%40luiserebii%2Fgit-identity)
[![Build Status](https://travis-ci.org/Luiserebii/git-identity.svg?branch=master)](https://travis-ci.org/Luiserebii/git-identity)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Luiserebii/git-identity.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Luiserebii/git-identity/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Luiserebii/git-identity.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Luiserebii/git-identity/alerts/)
```
                     .-') _                  _ .-') _     ('-.       .-') _  .-') _           .-') _               
                    (  OO) )                ( (  OO) )  _(  OO)     ( OO ) )(  OO) )         (  OO) )              
  ,----.     ,-.-') /     '._         ,-.-') \     .'_ (,------.,--./ ,--,' /     '._ ,-.-') /     '._  ,--.   ,--.
 '  .-./-')  |  |OO)|'--...__)        |  |OO),`'--..._) |  .---'|   \ |  |\ |'--...__)|  |OO)|'--...__)  \  `.'  / 
 |  |_( O- ) |  |  \'--.  .--'        |  |  \|  |  \  ' |  |    |    \|  | )'--.  .--'|  |  \'--.  .--'.-')     /  
 |  | .--, \ |  |(_/   |  |           |  |(_/|  |   ' |(|  '--. |  .     |/    |  |   |  |(_/   |  |  (OO  \   /   
(|  | '. (_/,|  |_.'   |  |          ,|  |_.'|  |   / : |  .--' |  |\    |     |  |  ,|  |_.'   |  |   |   /  /\_  
 |  '--'  |(_|  |      |  |         (_|  |   |  '--'  / |  `---.|  | \   |     |  | (_|  |      |  |   `-./  /.__) 
  `------'   `--'      `--'           `--'   `-------'  `------'`--'  `--'     `--'   `--'      `--'     `--'      
```

A command line tool allowing for easy shifting between git identities (username, email, and GPG).

<b>Version:</b> 0.4.3-alpha<br/>
<b>Author:</b> Luiserebii

## Usage
```
Usage: git-identity [options]

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
```

## Installation
### Linux
To install, simply extract the tool into a preferred directory, compile, and create a soft link. For example, if you are looking to place the tool in your home directory:
```
unzip git-identity-0.4.3-alpha.zip -d ~/
cd ~/git-identity-0.4.3-alpha
npm install
npm run build
sudo chmod u+x ~/git-identity-0.4.3-alpha/git-identity
sudo ln -s ~/git-identity-0.4.3-alpha/git-identity /usr/local/bin/git-identity
```

Doing this should make it globally accessible via `git-identity`. 

## Mirror
A mirror of this repository is available at: <https://serebii.io:2501/Luiserebii/git-identity>

## Contact
Questions? Comments? Suggestions? <br/>
Open an issue, make a pull request!
<br/><br/>
Or, you can email me at: luis@serebii.io
