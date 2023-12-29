import { Component } from '@angular/core';
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { NgIf } from '@angular/common';


@Component({
    selector: 'app-startscreen',
    standalone: true,
    templateUrl: './startscreen.component.html',
    styleUrl: './startscreen.component.scss',
    imports: [SignupComponent, LoginComponent, NgIf ]
})
export class StartscreenComponent {

  showSignUp = false;
  showLogin = true;



  goToSignUp(){
    this.showSignUp = true;
    this.showLogin = false;
  }

  closeSignUp(){
    this.showSignUp = false;
    this.showLogin = true;
  }


}
