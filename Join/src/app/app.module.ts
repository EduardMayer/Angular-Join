import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroComponent } from './startscreen/intro/intro.component';
import { LoginComponent } from './startscreen/login/login.component';
import { SignupComponent } from './startscreen/signup/signup.component';
import { LegalNoticeComponent } from './startscreen/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './startscreen/privacy-policy/privacy-policy.component';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    LoginComponent,
    SignupComponent,
    LegalNoticeComponent,
    PrivacyPolicyComponent,
    StartscreenComponent,
    MainscreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
