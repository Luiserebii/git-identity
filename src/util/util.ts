import child_process = require('child_process');

/**
 * Util.ts 
 * 
 * @author Luiserebii <luis@serebii.io>
 * @description Static utility class for holding generic functions which do not have an obvious place elsewhere.
 * 
 * 
 */
class Util {

  /**
   * Simple function for determining object emptiness.
   *  
   * @param {object} obj - Any JavaScript object.
   * @returns {bool} Boolean representing whether the object is empty or not. 
   */
  static objectIsEmpty(obj: object): boolean {
    for(let key in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Executes a command, returns string (trimmed by default)
   * NOTE: move this out
   * 
   * @param {string} cmd - Bash command to run 
   * @param {boolean} [noTrim=false] - Trim the resulting output from the command run.
   * 
   * @returns {string} Output printed by the command executed.
   */
  static exec(cmd: string, noTrim: boolean = false): string {
    let res: string = child_process.execSync(cmd, { 'encoding': 'utf8' });
    if(!noTrim) { res = res.trim(); }

    return res;
  }


}

export = Util;
