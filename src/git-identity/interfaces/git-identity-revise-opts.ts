import GitReviseOpts = require('../../git/interfaces/git-revise-opts');

interface GitIdentityReviseOpts extends GitReviseOpts {
  oldIdentity: string | null;
  newIdentity: string | null;
}

export = GitIdentityReviseOpts;
