import { MatCardModule } from '@angular/material/card';
import { UserFirebaseService } from '../../../services/user-firebase.service';
import {Component, OnInit,} from '@angular/core';
import {FormControl,FormGroupDirective,NgForm,Validators,FormsModule,ReactiveFormsModule,} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  titleFormControl = new FormControl('', [Validators.required]);
  user = new FormControl('');
  selectedPriority: any;

  priorityOptions = [
    { value: 'red', label: 'Urgent', icon: 'urgent.svg' },
    { value: 'orange', label: 'Medium', icon: 'medium.svg' },
    { value: 'green', label: 'Low', icon: 'low.svg' },
  ];
  

  constructor(public userService: UserFirebaseService,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    }

  async ngOnInit() {
    await this.userService.load();
    console.log('Loaded Users:', this.userService.loadedUsers);
  }


  getButtonStyle(option: any): any {
    return {
      'bg-red': option.value === 'red' && this.selectedPriority === 'red',
      'bg-orange': option.value === 'orange' && this.selectedPriority === 'orange',
      'bg-green': option.value === 'green' && this.selectedPriority === 'green',
    };
  }

  selectPriority(option: any): void {
    this.selectedPriority = this.selectedPriority === option.value ? null : option.value;
  }
}



