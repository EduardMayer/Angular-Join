import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UserFirebaseService } from '../../../../../services/user-firebase.service';
import { NotificationService } from '../../../../../services/notification.service';
import { User } from '../../../../../models/user.class';


@Component({
  selector: 'app-edit-contact-dialog',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule,
    ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './edit-contact-dialog.component.html',
  styleUrl: './edit-contact-dialog.component.scss'
})
export class EditContactDialogComponent implements OnInit {

  @Output() userDeleted = new EventEmitter<void>();
  creatForm: FormGroup;
  selectedUser: any;


  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  ]);

  phone: FormControl = new FormControl('', [
    Validators.pattern(/^[0-9+]+$/),
  ]);


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { selectedUser: any },
    public dialogRef: MatDialogRef<EditContactDialogComponent>,
    public userService: UserFirebaseService,
    private notificationService: NotificationService,
    private fb: FormBuilder,

  ) {
    this.selectedUser = data.selectedUser || {};

    this.creatForm = this.fb.group({
      name: this.name,
      email: this.email,
      phone: this.phone,
    });
  }

  ngOnInit() {
  }


  onFieldChange(value: any, propertyName: string) {
    if (this.selectedUser) {
      this.selectedUser[propertyName] = value;
    }
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

  closeEditContact() {
    this.dialogRef.close();
  }


  updateUser() {
    if (this.creatForm.valid && this.selectedUser && this.selectedUser.id) {
      const updatedUser: Partial<User> = {
        fullName: this.creatForm.value.name,
        mail: this.creatForm.value.email,
        phone: this.creatForm.value.phone,
      };

      this.userService.update(new User(updatedUser), this.selectedUser.id);
      this.userService.load().then(() => {
      this.userService.groupUsersByInitial();
      this.dialogRef.close();
      });
    }
  }


  async deleteSelectedUser() {
    if (this.selectedUser && this.selectedUser.id) {
      const userIdToDelete = this.selectedUser.id;
      await this.userService.deleteUserById(userIdToDelete);
      await this.userService.load();
      await this.userService.groupUsersByInitial();
      this.dialogRef.close();

    }
  }

}




