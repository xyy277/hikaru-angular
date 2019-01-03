import {Injectable} from '@angular/core';

@Injectable()
export class UtilHelper {

  public getGuid32() {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * 日期转化字符串
   * @param {Date} date 日期
   * @param {string} fmt 转化格式 默认：yyyy-MM-dd HH:mm:ss
   * @returns {string} 字符串
   */
  dateFormat(date: Date, fmt: string = 'yyyy-MM-dd HH:mm:ss') {
    const obj = new Date(date === null ? new Date : date);
    const o = {
      'M+' : obj.getMonth() + 1,
      'd+' : obj.getDate(),
      'H+' : obj.getHours(),
      'm+' : obj.getMinutes(),
      's+' : obj.getSeconds(),
      'q+' : Math.floor((obj.getMonth() + 3) / 3), // 季度
      'S'  : obj.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + '').substring(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  }

  /**
   * 判断对象是否含有某个key
   */
  public  containsKey(target: any, key: string) {
    if (typeof target !== 'object' || typeof key !== 'string') {
      return false;
    }
    return Object.keys(target).some(k => (k === key) || this.containsKey(target[k], key));
  }
}
