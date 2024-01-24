import { MatCardModule } from '@angular/material/card';
import { UserFirebaseService } from '../../../services/user-firebase.service';
import {CategoryFirebaseService } from '../../../services/category.service';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShowCategoryDialogComponent } from './show-category-dialog/show-category-dialog/show-category-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatCardModule, ColorPickerModule, CommonModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  titleFormControl = new FormControl('', [Validators.required]);
  user = new FormControl('');
  category = new FormControl('');
  color : string = '';
  toggle = false;
  
  constructor
    (
    public userService: UserFirebaseService,
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog,
    public categoryService: CategoryFirebaseService
    ) 
    {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    }

  async ngOnInit() {
    await this.userService.load();
    await this.categoryService.load();
    await this.userService.groupUsersByInitial();
    console.log('Loaded Users:', this.userService.loadedUsers);
  }


  
  addNewCategory(){
    const dialogRef = this.dialog.open(ShowCategoryDialogComponent);
  }
  

}




