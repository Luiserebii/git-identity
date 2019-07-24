type name = string;

interface JSONIdentity {
  name: JSONIdentityDetails; //Name mapped to JSONIdentityDetails; is this correct?
}

interface JSONIdentityDetails {
  username: string;
  email: string;
  gpgKey?: string;
}


export = JSONIdentity;
