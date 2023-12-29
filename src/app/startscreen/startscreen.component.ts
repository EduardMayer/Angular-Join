import { Component } from '@angular/core';


@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
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


