import {Injectable} from '@angular/core';


@Injectable()
export class Utilhelper {

  public getGuid32() {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() << 4 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public getUuid32() {
    let uuid = '';
    for (let i = 0; i < 32; i++) {
      const j = Math.floor(Math.random() * 10);
      uuid += j;
    }
    return uuid;
  }

  /**
   * 日期转化字符串
   * @param {Date} date
   * @param {string} fmt
   * @returns {string}
   */
  dateFormat(date: Date, fmt: string = 'yyyy-MM-dd HH:mm:ss') {
    const obj = new Date(date === null ? new Date : date);
    const o = {
      'M+' : obj.getMonth() + 1,
      'd+' : obj.getDay(),
      'H+' : obj.getHours(),
      'm+' : obj.getMinutes(),
      's+' : obj.getSeconds(),
      'q+' : Math.floor((obj.getMonth() + 3) / 3),
      'S' : obj.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (obj.getFullYear + '').substring(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k] : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  }
}
