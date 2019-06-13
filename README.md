# Identity Shift
A command line tool allowing for easy shifting between git identities (username, email, and GPG).

## Usage

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
