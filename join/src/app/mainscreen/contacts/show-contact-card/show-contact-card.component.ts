import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { UserFirebaseService } from '../../../../services/user-firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { updateCurrentUser } from 'firebase/auth';

@Component({
  selector: 'app-show-contact-card',
  standalone: true,
  imports: [CommonModule, EditContactDialogComponent, MatCardModule],
  templateUrl: './show-contact-card.component.html',
  styleUrls: ['./show-contact-card.component.scss'] // Correct property name
})
export class ShowContactCardComponent implements OnChanges {
  
  @Input() selectedUser: any;
  
  constructor(private userService: UserFirebaseService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef) {}


    ngOnChanges(changes: SimpleChanges): void {
      if ('selectedUser' in changes) {
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    }

    getInitials(): string {
      if (this.selectedUser && this.selectedUser.fullName) {
        const names = this.selectedUser.fullName.split(' ');
    
        if (names.length > 0) {
          const firstInitial = names[0][0]?.toUpperCase() || '';
          const lastInitial = names.length > 1 ? names[names.length - 1][0]?.toUpperCase() : '';
          return firstInitial + lastInitial;
        }
      }
      return '';
    }
  

    async deleteSelectedUser() {
      if (this.selectedUser && this.selectedUser.id) {
        const userIdToDelete = this.selectedUser.id;
        await this.userService.deleteUserById(userIdToDelete);
        this.selectedUser = null;
        await this.userService.load();
        await this.userService.groupUsersByInitial();
      }
    }


  editUser() {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: { selectedUser: this.selectedUser },
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.isDelete) {
        this.selectedUser = null;
      }
    });
  }
}
