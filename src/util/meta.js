/**
 * Meta class for metadata, or general configurable information on tool here pulled from package.json
 *
 */

'use strict';

const fs = require('fs');
const path = require('path');

class Meta {


  static readMetadata(file=path.resolve(__dirname, '../', '../', 'package.json')) {
    const packageJSON = fs.readFileSync(file);
    const metadata = JSON.parse(packageJSON); //No need to parse this manually, let's just give it as it is

    return metadata;
  }

}

 
module.exports = Meta;
