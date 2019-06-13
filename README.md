# git-identity
```
                     .-') _                  _ .-') _     ('-.       .-') _  .-') _           .-') _                       .-')    ('-. .-.                     .-') _    
                    (  OO) )                ( (  OO) )  _(  OO)     ( OO ) )(  OO) )         (  OO) )                     ( OO ). ( OO )  /                    (  OO) )   
  ,----.     ,-.-') /     '._         ,-.-') \     .'_ (,------.,--./ ,--,' /     '._ ,-.-') /     '._  ,--.   ,--.      (_)---\_),--. ,--.  ,-.-')    ,------./     '._  
 '  .-./-')  |  |OO)|'--...__)        |  |OO),`'--..._) |  .---'|   \ |  |\ |'--...__)|  |OO)|'--...__)  \  `.'  /       /    _ | |  | |  |  |  |OO)('-| _.---'|'--...__) 
 |  |_( O- ) |  |  \'--.  .--'        |  |  \|  |  \  ' |  |    |    \|  | )'--.  .--'|  |  \'--.  .--'.-')     /        \  :` `. |   .|  |  |  |  \(OO|(_\    '--.  .--' 
 |  | .--, \ |  |(_/   |  |           |  |(_/|  |   ' |(|  '--. |  .     |/    |  |   |  |(_/   |  |  (OO  \   /          '..`''.)|       |  |  |(_//  |  '--.    |  |    
(|  | '. (_/,|  |_.'   |  |          ,|  |_.'|  |   / : |  .--' |  |\    |     |  |  ,|  |_.'   |  |   |   /  /\_        .-._)   \|  .-.  | ,|  |_.'\_)|  .--'    |  |    
 |  '--'  |(_|  |      |  |         (_|  |   |  '--'  / |  `---.|  | \   |     |  | (_|  |      |  |   `-./  /.__)       \       /|  | |  |(_|  |     \|  |_)     |  |    
  `------'   `--'      `--'           `--'   `-------'  `------'`--'  `--'     `--'   `--'      `--'     `--'             `-----' `--' `--'  `--'      `--'       `--'    
```

A command line tool allowing for easy shifting between git identities (username, email, and GPG).

<b>Version:</b> 0.1.0<br/>
<b>Author:</b> Luiserebii

## Usage
```
Usage: index [options]

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

## Mirror
A mirror of this repository is available at: <https://serebii.io:2501/Luiserebii/git-identity>

## Contact
Questions? Comments? Suggestions? <br/>
Open an issue, make a pull request!
<br/><br/>
Or, you can email me at: luis@serebii.io
