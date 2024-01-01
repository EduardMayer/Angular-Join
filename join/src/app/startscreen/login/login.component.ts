import { Component,} from '@angular/core';
import { FormControl, Validators,} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { UserFirebaseService } from 'e:/Projekte/Angular-Join/join/src/services/user-firebase.service';
import { AuthFirebaseService } from 'e:/Projekte/Angular-Join/join/src/services/auth-firebase.service';
import { NotificationService } from 'e:/Projekte/Angular-Join/join/src/services/notification.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatIconModule, FormsModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private userService: UserFirebaseService,
    private authService: AuthFirebaseService,
    private notificationService: NotificationService,
  ) {}
  
  hidePassword = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  checked = false;
  
  guestLoginName = 'guest@join.de';
  guestLoginPassword = 'JoinGuest';

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

    /**
 * Initiates a guest login process.
 * 
 * @returns {void}
 */
    async guestLogin() {
      this.authService
        .login(this.guestLoginName, this.guestLoginPassword)
    }
  

}
