import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UserFirebaseService } from '../../../../services/user-firebase.service';

@Component({
  selector: 'app-add-contact-dialog',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule,
    ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule],
  templateUrl: './add-contact-dialog.component.html',
  styleUrl: './add-contact-dialog.component.scss'
})
export class AddContactDialogComponent {

  constructor(
    public userService: UserFirebaseService,
    public dialogRef: MatDialogRef<AddContactDialogComponent> // Inject MatDialogRef
  ) {}

  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  ]);

  phone: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);

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

  getErrorMessagePhone(): string {
    return this.phone.hasError('pattern')
      ? 'Invalid phone number format'
      : '';
  }

  closeAddContact() {
    this.dialogRef.close();
  }
}
