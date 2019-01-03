import { Injectable } from '@angular/core';
import { HEROES } from '../../../mock-heroes';
import { Hero } from '../model/hero';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../../msg/service/message.service';

@Injectable()
export class HeroService {

  msg = '正在加载中，请稍后......'; //服务缓冲
  interval: number = 777 / 3; //缓冲时间
  heroes: Hero[] = HEROES;  //模拟一个缓存数据源

  constructor(private messageService: MessageService) { }

  //异步函数签名形式
  //1）使用回调函数
  //2）使用Promise承诺形式
  //3）使用Observable可观察对象形式
  getHeroes(): Observable<Hero[]> {
    //TODO: 搜索到heroes数组后发送这个信息到消息缓存中
    this.messageService.add('HeroService：查询成功');
    return of(this.heroes);
  }

  getHero(id: number): Observable<Hero> {
    // var hero = this.heroes.filter(hero => {
    //   if (hero.id == id) return hero;
    // });
    //TODO:why filter方法行不通......
    let hero = this.heroes.find( hero => hero.id === id);
    this.messageService.add(`HeroService：找到id=${id}的英雄\t${this.messageService.toString(hero)}`); //加入这条消息 js字符串模板 `xxx ${a} xxx`
    return of (hero);
  }

  validataName(name: string): boolean {
    if (name != null && name.length > 0)name = name.trim();
    if (!name){
      this.messageService.add('<span style=\'color: brown\'>英雄名不能为空</span>');
      return false ;
    }
    if (this.heroes.findIndex( hero => {
        if (name == hero.name){
          return true;
        }
      }) != -1){ //通过索引遍历查找是否已存在该英雄 复杂度 O(1)
      this.messageService.add('<span style=\'color: brown\'>英雄名已存在</span>');
      return false ;
    }
    return true;
  }
  addHero(hero: Hero): Observable<Hero> {
    this.messageService.add(`HeroService：添加id=${hero.id}的英雄\t${this.messageService.toString(hero)}`); //加入这条消息 js字符串模板 `xxx ${a} xxx`
    this.heroes.push(hero);
    // HEROES.push(hero);
    return of(hero);
  }
  deleteHero(id: number): Observable<string> {
    this.messageService.add(`<span style="color: red">HeroService：删除id=${id}的英雄</span>`);
    this.heroes.some((hero, i) => {
      if (hero.id == id){
        this.heroes.splice(i, 1);
        return true;
      }
    });
    return of('delete success');
  }
  updateHero(hero: Hero): Observable<string> {
    alert(this.messageService.toString(hero));
    this.messageService.add(`HeroService：修改id=${hero.id}的英雄`);
    if (!this.validataName(hero.name)){
      return of('update fail') ;
    }
    this.heroes.some( (h, i) => {
      if (h.id == hero.id){
        this.heroes.splice(i, 1);
        this.heroes.push(hero);
        return true;
      }
    });
    return of('update success');
  }
  searchHero(name: string): Observable<Hero[]> {
    if (!name.trim()){
      this.messageService.add(`<span style="color: crimson">HeroService：搜索的内容不能为空</span>`);
      return of([]);
    }
    return of( this.heroes.filter( hero => {
      if (hero.name.toUpperCase().includes(name.toUpperCase())){
        this.messageService.add(`HeroService：搜索到${this.messageService.toString(hero)}的英雄`);
        return hero;
      }
    }) );
  }
}
