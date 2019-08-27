
class Util {

  static objectIsEmpty(obj: object): boolean {
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  /**
   *  Executes a command, returns string (trimmed by default)
   *  NOTE: move this out
   */
  static exec(cmd: string, encoding: string = 'utf8', noTrim: boolean = false): string {
    let res: string = child_process.execSync(cmd, { 'encoding': encoding });
    if(!noTrim) { res = res.trim(); }

    return res;
  }


}

export = Util;
