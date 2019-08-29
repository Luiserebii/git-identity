import GitReviseOpts = require('../../git/interfaces/git-revise-opts');

interface GitIdentityReviseOpts extends GitReviseOpts {
  identity: string;
}

export = GitIdentityReviseOpts;
