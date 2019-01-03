/**
 * Created by zhoujj on 2018/5/28.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name:"date"
})
export class DatePipe implements PipeTransform{

  constructor() {

  }
  transform(date:string , fmt='') { //参数默认赋值
    var obj = new Date(date);
    if(fmt ==null || fmt ==''){
      fmt = "yyyy-MM-dd HH:mm:ss"
    }
    var o = {
      "M+" : obj.getMonth() + 1,
      "d+" : obj.getDate(),
      "H+" : obj.getHours(),
      "m+" : obj.getMinutes(),
      "s+" : obj.getSeconds(),
      "q+" : Math.floor((obj.getMonth() + 3)/3), //季度
      "S"  : obj.getMilliseconds(), //毫秒
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substring(4-RegExp.$1.length));
    for(var k in o){
      if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
  }

}

