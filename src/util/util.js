'use strict';

class Util {

  static objectIsEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

}

module.exports = Util;
