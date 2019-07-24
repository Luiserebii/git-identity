import JSONIdentityDetails = require('./JSONIdentityDetails')

interface JSONIdentity {
  [ name: string ]: JSONIdentityDetails; 
}


export = JSONIdentity;
