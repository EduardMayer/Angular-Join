import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFirebaseService } from '../../../../services/user-firebase.service'; // Correct import

@Component({
  selector: 'app-show-contact-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-contact-card.component.html',
  styleUrls: ['./show-contact-card.component.scss'] // Correct property name
})
export class ShowContactCardComponent {
  @Input() selectedUser: any;

  constructor(private userService: UserFirebaseService) {}

  async deleteSelectedUser() {
    if (this.selectedUser && this.selectedUser.id) {
      const userIdToDelete = this.selectedUser.id;
      this.userService.deleteUserById(userIdToDelete);
      await this.userService.load();
      await this.userService.groupUsersByInitial();
      this.selectedUser = null;
    }
  }
}
