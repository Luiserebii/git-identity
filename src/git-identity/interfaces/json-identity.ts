import JSONIdentityDetails = require('./json-identity-details');

interface JSONIdentity {
  [ name: string ]: JSONIdentityDetails; 
}


export = JSONIdentity;
