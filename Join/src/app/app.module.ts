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
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    LoginComponent,
    SignupComponent,
    LegalNoticeComponent,
    PrivacyPolicyComponent,
    StartscreenComponent,
    MainscreenComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatRadioModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
