import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserFirebaseService } from '../../../services/user-firebase.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  constructor(
    public userService: UserFirebaseService,
  ) {}


}
