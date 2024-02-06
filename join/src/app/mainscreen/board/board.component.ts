import { Component, OnInit, } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserFirebaseService } from '../../../services/user-firebase.service';
import { TaskFirebaseService } from '../../../services/task.service';
import { CategoryFirebaseService } from '../../../services/category.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem,CdkDrag,CdkDropList, } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Task } from '../../../models/task.class';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, CdkDropList, CdkDrag, MatProgressBarModule, ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  todo: Task[] = [];
  progress: Task[] = [];
  feedback: Task[] = [];
  done: Task[] = [];


  async ngOnInit(){
    await this.userService.load();
    await this.userService.groupUsersByInitial();
    await this.taskService.load();
    await this.categoryService.load();
    this.initializeTaskArrays();
    }

    constructor(
      public userService: UserFirebaseService,
      public taskService: TaskFirebaseService,
      public categoryService : CategoryFirebaseService,
      public dialog: MatDialog,

      
    ) {}

    private initializeTaskArrays() {
      this.todo = this.taskService.tasks.filter(task => task.status === 'todo');
      this.progress = this.taskService.tasks.filter(task => task.status === 'progress');
      this.feedback = this.taskService.tasks.filter(task => task.status === 'feedback');
      this.done = this.taskService.tasks.filter(task => task.status === 'done');
    }

    getUserColor(userName: string): string {
      const user = this.userService.loadedUsers.find(user => user.fullName === userName);
      return user ? user.color : 'initial';
    }


    async drop(event: CdkDragDrop<Task[]>, destinationStatus: string) {
      
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        const taskToMove = event.previousContainer.data[event.previousIndex];
    
        if (taskToMove) {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
    
          taskToMove.status = destinationStatus;
          await this.taskService.update(taskToMove, destinationStatus);
      
      }
    }
  }
}
 
    


