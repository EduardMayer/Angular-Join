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
import { NotificationService } from '../../../../services/notification.service';



@Component({
  selector: 'app-add-contact-dialog',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule,
    ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule],
  templateUrl: './add-contact-dialog.component.html',
  styleUrl: './add-contact-dialog.component.scss'
})
export class AddContactDialogComponent {
  creatForm: FormGroup;

  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  ]);

  phone: FormControl = new FormControl('', [
    Validators.pattern(/^[0-9]+$/),
  ]);

  constructor(
    public userService: UserFirebaseService,
    public dialogRef: MatDialogRef<AddContactDialogComponent>,
    private notificationService: NotificationService,
    private fb: FormBuilder,
  ) {
    this.creatForm = this.fb.group({
      name: this.name,
      email: this.email,
      phone: this.phone,
    });
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

  getErrorMessagePhone(): string {
    return this.phone.hasError('pattern')
      ? 'Invalid phone number format'
      : '';
  }

  closeAddContact() {
    this.dialogRef.close();
  }

  get isFormValid(): boolean {
    return this.creatForm.valid;
  }
  
  async addNewUser() {
    if (this.isFormValid) {
      const name = this.creatForm.get('name')?.value || '';
      const email = this.creatForm.get('email')?.value || '';
      const phone = this.creatForm.get('phone')?.value || '';
  
      this.userService.addNewUserData(name, email, phone);
      await this.userService.load();
      await this.userService.groupUsersByInitial();
      this.notificationService.renderNotification('Contact succesfully created', 'create', 'shift-right-in', 4, true);
      this.closeAddContact();
    }
  }

  
}