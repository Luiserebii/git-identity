import GitCloneOpts = require('../../git/interfaces/git-clone-opts');
import Identity = require('../identity');

interface GitIdentityCloneOpts extends GitCloneOpts {
  identity: Identity;
}

export = GitIdentityCloneOpts;
