import { Component, OnInit } from '@angular/core';
import {Hero} from '../../module/hero/model/hero';
import {HeroService} from '../../module/hero/service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  msg: string;
  heroes: Hero[] = [];
  topMax: number;
  top: number ;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    let top = Math.floor((Math.random() * 100) % 10); // top值
    this.topMax = this.heroService.heroes.length; // 变长数组的长度
    this.top = top;
    // this.top = this.top<0 ? 0 : this.top;
    // this.top = this.top>10 ? 10 : this.top;
    this.msg = this.heroService.msg ;
    setTimeout(() => {
      this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes.slice(0, this.top)); // slice 数组的一个截取 模拟一个top
      this.msg = '';
    }, this.heroService.interval);
  }
}
