
import fs = require('fs');
import path = require('path');

import JSONMetadata = require('./interfaces/json-metadata');

/**
 * Meta.ts
 *
 * @author Luiserebii <luis@serebii.io> 
 * @description Meta class for metadata, or general configurable information on tool here pulled from package.json.
 *
 */
class Meta {

  /**
   * Read metadata from a JSON file; this function in particular is intended to consume `package.json`.
   * 
   * @param {string} [file=path.resolve(__dirname, '../', '../', 'package.json')] - File to read metadata from.
   * @returns {JSONMetadata} - An object compliant with the JSONMetadata interface.
   */
  static readMetadata(file: string = path.resolve(__dirname, '../', '../', 'package.json')): JSONMetadata {
    const packageJSON: string = fs.readFileSync(file, 'utf8');
    const metadata: JSONMetadata = JSON.parse(packageJSON); //No need to parse this manually, let's just give it as is

    return metadata;
  }

}

 
export = Meta;
