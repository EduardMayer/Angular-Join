import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { UserFirebaseService } from '../../../../services/user-firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-show-contact-card',
  standalone: true,
  imports: [CommonModule, EditContactDialogComponent, MatCardModule],
  templateUrl: './show-contact-card.component.html',
  styleUrls: ['./show-contact-card.component.scss'] // Correct property name
})
export class ShowContactCardComponent {
  
  @Input() selectedUser: any;
  
  constructor(private userService: UserFirebaseService,
    public dialog: MatDialog) {}


  async deleteSelectedUser() {
    if (this.selectedUser && this.selectedUser.id) {
      const userIdToDelete = this.selectedUser.id;
      this.userService.deleteUserById(userIdToDelete);
      await this.userService.load();
      await this.userService.groupUsersByInitial();
      this.selectedUser = null;
    }
  }

  editUser() {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: { selectedUser: this.selectedUser },
    });
  };

  
  onUserDeleted() {
    console.log('onUserDeleted called');
    this.selectedUser = null;
  }

}
