/**
 * Meta class for metadata, or general configurable information on tool here pulled from package.json
 *
 */

'use strict';

const fs = require('fs');


class Meta {


  readMetadata() {
    const packageJSON = fs.readFileSync('./package.json');
    const metadata = JSON.parse(packageJSON); //No need to parse this manually, let's just give it as it is

    return metadata;
  }

}

 
module.exports = Meta;
