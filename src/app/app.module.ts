import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ViewPersonComponent } from './view-person/view-person.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatePersonComponent,
    NavBarComponent,
    ViewPersonComponent
  ],
  imports: [
    BrowserModule,FormsModule , AppRoutingModule , HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
