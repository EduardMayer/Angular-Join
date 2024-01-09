import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../../../services/user-firebase.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor} from '@angular/common';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  imports: [MatCardModule, NgFor, AddContactDialogComponent, EditContactDialogComponent],
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  async ngOnInit(){
  await this.userService.load();
  this.groupUsersByInitial();
  }


  userGroups: { initial: string, users: any[] }[] = [];


  constructor(
    public userService: UserFirebaseService,
    public dialog: MatDialog,
  ) {}


  groupUsersByInitial() {
    this.userGroups = [];
    this.userService.loadedUsers.forEach(user => {
      const initial = user.fullName.charAt(0).toUpperCase();
      const existingGroup = this.userGroups.find(group => group.initial === initial);

      if (existingGroup) {
        existingGroup.users.push(user);
      } else {
        this.userGroups.push({ initial, users: [user] });
      }
    });
    this.userGroups.sort((a, b) => a.initial.localeCompare(b.initial));
  }

  openAddUser() {
    this.dialog.open(AddContactDialogComponent);
  }
  

}
