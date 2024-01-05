import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../../../services/user-firebase.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  imports: [MatCardModule, NgFor],
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  userGroups: { initial: string, users: any[] }[] = [];

  constructor(
    public userService: UserFirebaseService
  ) {}

  async ngOnInit() {
    await this.userService.load();
    this.groupUsersByInitial();
    console.log('User Groups:', this.userGroups);
  }

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

    // Sortiere die Gruppen nach dem Anfangsbuchstaben
    this.userGroups.sort((a, b) => a.initial.localeCompare(b.initial));
  }
}
