import { Component, OnInit } from '@angular/core';
import {HeroService} from "../../module/hero/service/hero.service";
import {Hero} from "../../module/hero/model/hero";
import {Observable,Subject,} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>(); // Subject 可观察的数据源,本身是Observable,next()方法可以往Observable中推送一些值

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), // 在传出最终字符之前，debounceTime将会等待，直到新增字符的事件暂停了300ms
      distinctUntilChanged(), // 确保只在过滤条件变化时才发送请求
      // 会为每个从debounce和distinctUntilChanged中通过的搜索词提供搜索服务，会取消并丢弃以前的可观察对象，只保留最新的
      switchMap( (term: string) => this.heroService.searchHero(term)),
    );
  }
  // 通过文本框的keystroke事件的事件绑定调用
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
