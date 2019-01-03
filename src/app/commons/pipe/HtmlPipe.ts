/**
 * Created by zhoujj on 2018/5/28.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
@Pipe({
  name:"html"
})
//自定义管道做html转换
export class HtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {

  }

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}
