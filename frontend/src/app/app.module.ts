import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login/login.service';
import { ThemeService } from './services/theme/theme.service';
import { UserService } from './services/user/user.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, LoginService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
