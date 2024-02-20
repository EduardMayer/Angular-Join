import { Component, Inject,  } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { UserFirebaseService } from '../../../../services/user-firebase.service';
import { TaskFirebaseService } from '../../../../services/task.service';
import { CategoryFirebaseService } from '../../../../services/category.service';
import { MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../../../models/task.class';
import { FormatService } from '../../../../services/format-date.service';
import { DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-task-card-dialog',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatCheckboxModule, FormsModule, CommonModule],
  templateUrl: './task-card-dialog.component.html',
  styleUrl: './task-card-dialog.component.scss'
})
export class TaskCardDialogComponent {


    constructor(
      public userService: UserFirebaseService,
      public taskService: TaskFirebaseService,
      public categoryService : CategoryFirebaseService,
      public dialogRef: MatDialogRef<TaskCardDialogComponent>,
      public formatDateService: FormatService,
      @Inject(MAT_DIALOG_DATA) public data: Task
      
    ) {}

    ngOnInit(): void {
      this.userService.load();
      this.taskService.load(); 
    }

    capitalizeFirstLetter(word: string): string {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    processAssignedString(inputString: string): string {
      inputString = inputString.trim();
      let names = inputString.split(',').map(function(name) {
          return name.trim();
      });
  
      let result = '';
  
      names.forEach(function(name) {
          result += "<span>" + name + "</span>";
      });
  
      return result;
  }

  closeCard(){
    this.dialogRef.close();
  }


  
  async updateSubtask(i: number, checked: boolean) {
    try {
      const taskId = this.taskService.tasks[i].id; 
      const task = await this.taskService.getTaskByID(taskId);
      
      if (task.subtasks[i]) {
        if (checked) {
          task.subtasks[i].completed = true;
        } else {
          task.subtasks[i].completed = false;
        }
        
        await this.taskService.updateSubtasks(taskId, task.subtasks);

        console.log()
      }
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  }




}
