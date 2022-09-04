import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FutebolComponent } from './futebol/futebol.component';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DragDropModule } from '@angular/cdk/drag-drop'
import {MatButtonModule} from '@angular/material/button'; 

@NgModule({
  declarations: [
    AppComponent,
    FutebolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
