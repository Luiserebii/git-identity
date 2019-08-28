import GitCloneOpts = require('../../git/interfaces/git-clone-opts');

interface GitIdentityCloneOpts extends GitCloneOpts {
  identity: string;
}

export = GitIdentityCloneOpts;
