import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FutebolComponent } from './futebol/futebol.component';

const routes: Routes = [
  {path: 'jogadores', component:FutebolComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
