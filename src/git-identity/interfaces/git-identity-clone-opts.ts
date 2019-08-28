import GitCloneOpts = require('../../git/interfaces/git-clone-opts');
import Identity = require('../identity.ts');

interface GitIdentityCloneOpts extends GitCloneOpts {
  identity: Identity;
}

export = GitIdentityCloneOpts;
