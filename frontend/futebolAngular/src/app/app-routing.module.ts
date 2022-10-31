import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FutebolComponent } from './futebol/futebol.component';
import {TesteFutebolComponent} from "./teste-futebol/teste-futebol.component";
import {HomeComponent} from "./home/home.component";
import {DevComponent} from "./dev/dev.component";

const routes: Routes = [
  {path: 'jogadores', component:FutebolComponent},
  {path: 'teste', component: TesteFutebolComponent},
  {path: '',component: HomeComponent},
  {path: 'dev',component: DevComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
