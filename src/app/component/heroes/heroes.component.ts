import {AfterViewInit, Component, OnInit,} from '@angular/core';
import {Hero} from '../../module/hero/model/hero';
import {HeroService} from '../../module/hero/service/hero.service';
import {MessageService} from "../../module/msg/service/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit,AfterViewInit {
  msg: string;
  hero: Hero;
  heroes = []; //TODO声明Hero[] 会报错
  constructor(
    private router: Router,
    private heroService: HeroService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    //键盘监听事件
    this.getHeroes();
  }
  ngAfterViewInit(): void {

  }
  getHeroes(): void {
    this.msg = this.heroService.msg ;
    setTimeout(() => {
      this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
      this.msg = '';
    },this.heroService.interval)
  }

  add(name: string): void {
    if(!this.heroService.validataName(name)){
      return ;
    }
    do{
      var id = Math.floor(Math.random()*100);
    }while (this.heroes.some( hero=>{
      if(hero.id == id){
        this.messageService.add(this.messageService.formatDate(new Date())+":"+name+"\tid: "+id+"重复，重新生成id.......");
        return true;
      }
    }));
    var hero: Hero = new Hero;
    hero.id = id;
    hero.name = name;
    this.heroService.addHero(hero);
  }
  detail(id: number): void {
    this.router.navigate(['/detail/'+id ])
  }
  delete(id:number): void {
      this.heroService.deleteHero(id)
        .subscribe(str => this.messageService.add(str));
  }
}
