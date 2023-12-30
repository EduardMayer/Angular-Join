import { Component } from '@angular/core';
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-startscreen',
    standalone: true,
    templateUrl: './startscreen.component.html',
    styleUrl: './startscreen.component.scss',
    imports: [SignupComponent, LoginComponent, RouterLink, MatButtonModule]
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
