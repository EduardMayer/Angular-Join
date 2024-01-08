import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserFirebaseService } from '../../../../services/user-firebase.service';

@Component({
  selector: 'app-edit-contact-dialog',
  standalone: true,
  imports: [MatCardModule, ],
  templateUrl: './edit-contact-dialog.component.html',
  styleUrl: './edit-contact-dialog.component.scss'
})
export class EditContactDialogComponent {

  constructor(
    public userService: UserFirebaseService
  ) {}


}
