import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { UserFirebaseService } from 'e:/Projekte/Angular-Join/join/src/services/user-firebase.service';
import { AuthFirebaseService } from 'e:/Projekte/Angular-Join/join/src/services/auth-firebase.service';
import { NotificationService } from 'e:/Projekte/Angular-Join/join/src/services/notification.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule, 
    ReactiveFormsModule, MatButtonModule, CommonModule, FormsModule, RouterLink],
})
export class SignupComponent {

  constructor(
    private userService: UserFirebaseService,
    private authService: AuthFirebaseService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  @Output() closeSignUpView = new EventEmitter<void>();
  

  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  ]);

  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[!@#$%^&*()-_+]).*$/),
  ]);
  
  confirmPassword: FormControl = new FormControl('', [
    Validators.required
  ]);

  hidePassword: boolean = true;
  someCondition: boolean = true;
  checkboxChecked: boolean = false;

  signUpForm = this.fb.group(
    {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    { validators: this.passwordMatchValidator }
  );

   
   get isFormValid(): boolean {
    return this.signUpForm.valid;
  }

 
  private passwordMatchValidator(group: FormGroup): null | { mismatch: true } {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      confirmPasswordControl!.setErrors(null);
      return null;
    }
  }

  closeSignUp() {
    this.closeSignUpView.emit();
  }

  getErrorMessageName(): string {
    return this.name.hasError('required')
      ? 'Name is required'
      : this.name.hasError('minlength')
      ? 'Name must be at least 3 characters'
      : '';
  }

  getErrorMessageEmail(): string {
    return this.email.hasError('required')
      ? 'Email is required'
      : this.email.hasError('pattern')
      ? 'Invalid email format'
      : '';
  }

  getErrorMessagePassword(): string {
    return this.password.hasError('required')
      ? 'Password is required'
      : this.password.hasError('minlength')
      ? 'Password must be at least 6 characters'
      : this.password.hasError('pattern')
      ? 'Password must contain at least one special character'
      : '';
  }

  getErrorMessageConfirmPassword(): string {
    return this.confirmPassword.hasError('required')
      ? 'Confirm Password is required'
      : this.confirmPassword.hasError('mismatch')
      ? 'Passwords do not match'
      : '';
  }


  async onSubmit() {
    const name = this.signUpForm.get('name')?.value || '';
    const email = this.signUpForm.get('email')?.value || '';
    const password = this.signUpForm.get('password')?.value || '';
    this.userService.registUser.fullName = name;
    this.userService.registUser.mail = email;
  
    if (this.isFormValid) {
      await this.authService.register(email, password)
        .then(() => {
          this.notificationService.renderNotification("Registrierung erfolgreich", 'success', "shift-right-in", 2, true);
          this.userService.addRegistUserWithUID(this.userService.registUser.id);
          this.closeSignUp();
        })
        .catch((error) => {
          const errorCode = error.code;
          this.notificationService.renderNotification(`Fehler bei der Registrierung`, 'error', 'shift-right-in', 3, false);
          console.log(errorCode);
        });
  
    }
  }
}
