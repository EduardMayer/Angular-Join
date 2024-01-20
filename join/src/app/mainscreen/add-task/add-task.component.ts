import { MatCardModule } from '@angular/material/card';
import { UserFirebaseService } from '../../../services/user-firebase.service';
import {Component, OnInit} from '@angular/core';
import {FormControl,FormGroupDirective,NgForm,Validators,FormsModule,ReactiveFormsModule,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatCardModule, MatInputModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatListModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  titleFormControl = new FormControl('', [Validators.required]);
  user = new FormControl('');
  

  constructor(public userService: UserFirebaseService) {}

  async ngOnInit() {
    await this.userService.load();
    console.log('Loaded Users:', this.userService.loadedUsers);
  }
}






