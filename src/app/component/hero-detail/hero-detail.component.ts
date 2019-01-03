import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../module/hero/model/hero';
import {ActivatedRoute} from '@angular/router'; // 保存着这个HeroDetailComponent实例的路由信息
import { Location } from '@angular/common'; // Angular服务,与浏览器打交道
import { HeroService } from '../../module/hero/service/hero.service';
import set = Reflect.set;
@Component({
  selector: 'app-hero-detail',
  template: `
    <div *ngIf="msg">
      <h3>{{msg}}</h3>
    </div>
    <div *ngIf="hero">
      <h2>{{ hero.name | uppercase }} Details</h2>
      <div><span>id: </span>{{hero.id}}</div>
      <div><span>name: </span>{{hero.name}}</div>

      <div>
        <label>name:
          <input [(ngModel)]="hero.name" pattern="name" />
        </label>
      </div>
      <button (click)="goBack()">返回</button>
      <!--<button (click)="save(hero.name)">保存</button>-->
    </div>
  `,
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  msg: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void { // 声明周期钩子 初始化获取hero
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id'); // type : string
    this.msg = this.heroService.msg;
    setTimeout(() => {
      this.heroService.getHero(Number.parseInt(id)) // 自己埋的坑自己填
        .subscribe(hero => this.hero = hero);
      this.msg = '';
    }, this.heroService.interval);
  }

  save(name: string): void {
    this.hero.name = name;
    this.heroService.updateHero(this.hero)
      .subscribe(msg => console.log(msg));
  }

  goBack(): void {
    this.location.back();
  }
}
