import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FutebolComponent } from './futebol/futebol.component';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DragDropModule } from '@angular/cdk/drag-drop'
import {MatButtonModule} from '@angular/material/button';
import { JogadorFormComponent } from './jogador-form/jogador-form.component';
import { TesteFutebolComponent } from './teste-futebol/teste-futebol.component';
import { HomeComponent } from './home/home.component';
import { DevComponent } from './dev/dev.component';
import { TutorialComponent } from './tutorial/tutorial.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    FutebolComponent,
    JogadorFormComponent,
    TesteFutebolComponent,
    HomeComponent,
    DevComponent,
    TutorialComponent
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
