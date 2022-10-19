import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FutebolComponent } from './futebol/futebol.component';
import {TesteFutebolComponent} from "./teste-futebol/teste-futebol.component";

const routes: Routes = [
  {path: 'jogadores', component:FutebolComponent},
  {path: 'teste', component: TesteFutebolComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
