import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { login } from './login/login.user.component';
import { users } from './user.service';
import { getUser } from './user/user.list.component';

@NgModule({
  declarations: [
    AppComponent,
    login,
    getUser
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full'},
      { path: 'login', component: login },
      { path: 'data', component: getUser }
    ])
  ],
  providers: [
    users
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
