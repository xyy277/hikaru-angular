import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './component/heroes/heroes.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import { HeroDetailComponent } from './component/hero-detail/hero-detail.component';
import {KafkaComponent} from './component/kafka/kafka.component';
import {ExcelComponent} from './component/excel/excel.component';

// 路由定义
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // 添加默认路由，重定向到仪表盘
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'kafka', component: KafkaComponent},
  { path: 'excel', component: ExcelComponent},
  { path: 'detail/:id', component: HeroDetailComponent }, // path 中( :id ) 是一个占位符，表示某个特定的id
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes), // 首先初始化路由器，开始监听浏览器中的地址变化
    // forRoot() 须在应用的顶级配置这个路由器方法，它会提供所需服务的提供商和指令，还会基于浏览器的当前url执行首次导航
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
