/**
 * Meta class for metadata, or general configurable information on tool here pulled from package.json
 *
 */

import fs = require('fs');
import path = require('path');

class Meta {


  static readMetadata(file: string = path.resolve(__dirname, '../', '../', 'package.json')): object {
    const packageJSON: string = fs.readFileSync(file, 'utf8');
    const metadata: object = JSON.parse(packageJSON); //No need to parse this manually, let's just give it as it is

    return metadata;
  }

}

 
export = Meta;
