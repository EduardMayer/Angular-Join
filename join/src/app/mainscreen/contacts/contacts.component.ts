import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../../../services/user-firebase.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor} from '@angular/common';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ShowContactCardComponent } from './show-contact-card/show-contact-card.component';


@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  imports: [MatCardModule, NgFor, AddContactDialogComponent, EditContactDialogComponent, ShowContactCardComponent],
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

  selectedUser: any;
  
  async ngOnInit(){
  await this.userService.load();
  await this.userService.groupUsersByInitial();
  }

  
  constructor(
    public userService: UserFirebaseService,
    public dialog: MatDialog,
  ) {}


  openAddUser() {
    this.dialog.open(AddContactDialogComponent);
  }

  showUserDetails(user: any, group: any): void {
    this.selectedUser = {
        ...user,
        ...group,
       
    };
}
  

}
