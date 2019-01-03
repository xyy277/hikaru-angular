import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './component/heroes/heroes.component';
import { HeroDetailComponent } from './component/hero-detail/hero-detail.component';
import { HeroService } from './module/hero/service/hero.service';
import { MessagesComponent } from './component/messages/messages.component';
import { MessageService } from './module/msg/service/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {HtmlPipe} from './commons/pipe/HtmlPipe';
import {DatePipe} from './commons/pipe/DatePipe';
import { HeroSearchComponent } from './component/hero-search/hero-search.component';
import {KafkaComponent} from './component/kafka/kafka.component';
import { ExcelComponent } from './component/excel/excel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HtmlPipe,
    HeroSearchComponent,
    DatePipe,
    KafkaComponent,
    ExcelComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [HeroService, MessageService], // 依赖注入的服务
  bootstrap: [AppComponent]
})
export class AppModule { }
