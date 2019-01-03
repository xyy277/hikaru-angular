import { Injectable } from '@angular/core';
import {Hero} from "../../hero/model/hero";
import {Msg} from "../model/msg";

//消息服务
@Injectable()
export class MessageService {
  messages: Msg[]= [];
  key: number = 0;
  add(message: string) {
    var msg:Msg = new Msg();
    msg.key = ""+(this.key++);
    msg.value = this.formatDate(new Date())+"===>"+message;
    this.messages.push(msg);
  }

  clear() {
    this.add(`MessageService：正在清除消息...`);
    var it = setInterval( () => {
      if(this.messages.length <= 0){ //先进先出 每次从头开始清除
        clearInterval(it);
        it = null;
      }
      this.messages.some( (item,index)=>{
        if(index == 0) {
          this.messages.splice(index,1);
          return true;
        }
      });
    }, 50);
  }
  toString(hero: Hero):string {
    return "<span style='color: green'>id:"+hero.id+"\tname:"+hero.name+"</span>";
  }
  formatDate(date: Date):string {
    var y = date.getFullYear();
    var M = (date.getMonth() + 1).toString();
    var d = date.getDate().toString();
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var s = date.getSeconds().toString();
    return `${y}-${M.length>1?M:"0"+M}-${d.length>1?d:"0"+d} ${h.length>1?h:"0"+h}:${m.length>1?m:"0"+m}:${s.length>1?s:"0"+s}`;
  }

}
