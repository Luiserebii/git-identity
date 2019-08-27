interface GitUser {
  name: string;
  email: string;
  signingKey: string | null | undefined;
}

export = GitUser;
