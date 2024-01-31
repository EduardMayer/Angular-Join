import { MatCardModule } from '@angular/material/card';
import { UserFirebaseService } from '../../../services/user-firebase.service';
import { CategoryFirebaseService } from '../../../services/category.service';
import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShowCategoryDialogComponent } from './show-category-dialog/show-category-dialog/show-category-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSelectChange } from '@angular/material/select';
import { TaskFirebaseService } from '../../../services/task.service';


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
  titleInput: string = '';
  descriptionInput: string = '';
  selectedUsers: string[] = [];
  selectedDate: string = '';
  selectedPrio: string = "";
  selectCategory: string = '';
  color: string = '';
  inputValue: string = '';
  subtasks: string[] = [];
  editedSubtask: string = '';
  editedSubtaskIndex: number | undefined;
  showSubTask: boolean = true;
  showEditTask: boolean = false;
  showAddIcon: boolean = true;
  showCheckIcon: boolean = false;
  showCloseIcon: boolean = false;


  constructor
    (
      public userService: UserFirebaseService,
      public taskService: TaskFirebaseService,
      private dateAdapter: DateAdapter<Date>,
      public dialog: MatDialog,
      public categoryService: CategoryFirebaseService,
      private formBuilder: FormBuilder
    ) {
    this.dateAdapter.setLocale('en-GB');
  } //dd/MM/yyyy


  async ngOnInit() {
    await this.userService.load();
    await this.categoryService.load();
    await this.userService.groupUsersByInitial();
    console.log('Loaded Users:', this.userService.loadedUsers);
  }



  addNewCategory() {
    const dialogRef = this.dialog.open(ShowCategoryDialogComponent);
  }

  onUserSelectionChange(event: MatSelectChange): void {
    this.selectedUsers = event.value;
    this.updateAllSelectInitial();
  }


  updateAllSelectInitial(): void {
    const allSelectInitialElement = document.querySelector('.all-select-initial-container');

    if (allSelectInitialElement) {
      allSelectInitialElement.innerHTML = this.selectedUsers
        .map(user => {
          const [firstNameInitial, lastNameInitial] = user.split(' ').map(name => name?.[0] || '');
          const userColor = this.getUserColor(user);

          return `<div style="background: ${userColor}; display: flex; color: white; border-radius: 45px; min-width: 42px; height: 42px; justify-content: center; align-items: center;">${firstNameInitial}${lastNameInitial}</div>`;
        })
        .join(' ');
    }
  }

  getUserColor(userName: string): string {
    const user = this.userService.loadedUsers.find(user => user.fullName === userName);
    return user ? user.color : 'initial';
  }

  onInputChange() {

    if (this.inputValue === '') {

      this.showAddIcon = true;
      this.showCheckIcon = false;
      this.showCloseIcon = false;
    } else {

      this.showAddIcon = false;
      this.showCheckIcon = true;
      this.showCloseIcon = true;

    }

  }


  closeSubtasks() {
    this.inputValue = '';
    this.showAddIcon = true;
    this.showCheckIcon = false;
    this.showCloseIcon = false;
  }
  addSubtasks() {
    if (this.inputValue.trim() !== '') {
      this.subtasks.push(this.inputValue.trim());
      this.inputValue = '';
    }
  }

  editSubtask(subtask: string, index: number) {
    this.showSubTask = false;
    this.showEditTask = true;
    this.editedSubtask = subtask;
    this.editedSubtaskIndex = index; // Variable, um den Index des bearbeiteten Subtasks zu speichern
  }

  saveEditedSubtask() {
    if (this.editedSubtaskIndex !== undefined) {
      console.log("Saved: ", this.editedSubtask);
      this.subtasks[this.editedSubtaskIndex] = this.editedSubtask;
      this.showSubTask = true;
      this.showEditTask = false;
      this.editedSubtask = '';
      this.editedSubtaskIndex = undefined;
    }
  }

  deleteTask(subtask: string, i: number) {
    this.subtasks.splice(i, 1);
    this.editedSubtask = '';
    this.editedSubtaskIndex = undefined;
  }


  deleteSelectTask() {
    if (this.editedSubtaskIndex !== undefined) {
      this.subtasks.splice(this.editedSubtaskIndex, 1);
      this.showSubTask = true;
      this.showEditTask = false;
      this.editedSubtask = '';
      this.editedSubtaskIndex = undefined;
    }
  }

  onPrioChange(event: any) {
    this.selectedPrio = event.value;
  }

  onCategoryChange(event: MatSelectChange): void {
    this.selectCategory = event.value;
    console.log('Selected Category:', this.selectCategory);

  }

  clearInitialContainer() {
    const initialContainer = document.querySelector('.all-select-initial-container');
    if (initialContainer) {
      initialContainer.innerHTML = '';
    }
  }

  async addNewTask() {
    const title = this.titleInput;
    const description = this.descriptionInput;
    const category = this.selectCategory;
    const dueDate = this.selectedDate;
    const priority = this.selectedPrio;
    const subtasks = this.subtasks || [];
    const assignedTo = this.user.value || "";

    await this.taskService.addNewTask(title, description, assignedTo, dueDate, priority, category, subtasks);
    this.clearTask();
  }

  clearTask() {
    this.titleInput = '';
    this.descriptionInput = '';
    this.selectCategory = '';
    this.selectedDate = '';
    this.selectedPrio = '';
    this.subtasks = [];
    this.user.setValue('');
    this.clearInitialContainer();
    this.closeSubtasks();
  }

}
