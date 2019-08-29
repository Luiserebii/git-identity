import child_process = require('child_process');

class Util {

  static objectIsEmpty(obj: object): boolean {
    for(let key in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  /**
   *  Executes a command, returns string (trimmed by default)
   *  NOTE: move this out
   */
  static exec(cmd: string, noTrim: boolean = false): string {
    let res: string = child_process.execSync(cmd, { 'encoding': 'utf8' });
    if(!noTrim) { res = res.trim(); }

    return res;
  }


}

export = Util;
