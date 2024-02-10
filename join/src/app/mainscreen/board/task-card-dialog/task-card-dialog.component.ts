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



@Component({
  selector: 'app-task-card-dialog',
  standalone: true,
  imports: [MatCardModule, DatePipe],
  templateUrl: './task-card-dialog.component.html',
  styleUrl: './task-card-dialog.component.scss'
})
export class TaskCardDialogComponent {
  formattedDate: string = "";

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
}
