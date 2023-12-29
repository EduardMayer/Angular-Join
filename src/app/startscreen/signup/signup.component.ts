import { Component, EventEmitter, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  checked = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  @Output() closeSignUpView = new EventEmitter<void>();

  closeSignUp() {
    this.closeSignUpView.emit();
  }
 
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
