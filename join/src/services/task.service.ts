import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, getDocs, getDoc, setDoc, addDoc, deleteDoc, DocumentData, Query, query, updateDoc } from "firebase/firestore";
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class TaskFirebaseService {

  
  public tasks: Task[] = []; // Änderung hier: todoTasks zu tasks
  public unsubTask: any;
  public finishedLoading = false;
  public addTask = new Task();

  constructor(private firestore: Firestore) {
  }

  async load() {
    try {
      await this.loadTasks();
      this.finishedLoading = true;

      console.log("Data loaded successfully!");
      console.log(this.tasks); // Änderung hier: todoTasks zu tasks
    } catch (error) {
      console.error('Error during query:', error);
    }
  }

  private async loadTasks() {
    const todo = query(collection(this.firestore, "tasks"));
    await this.loadTasksFromSnapshot(todo, this.tasks); 
  }

  private async loadTasksFromSnapshot(query: Query<unknown, DocumentData>, taskArray: Task[]) {
    const snapshot = await getDocs(query);

    snapshot.forEach((doc) => {
      const task = new Task(doc.data());
      taskArray.push(task);
    });
  }



  async addNewTask(title: string, status: string, description: string, assigned: string, date: string, prio: string, category: string, subtasks: string[]) {
    try {
        this.addTask.title = title;
        this.addTask.status = status;
        this.addTask.description = description;
        this.addTask.assigned = assigned;
        this.addTask.date = date;
        this.addTask.prio = prio;
        this.addTask.category = category;
        this.addTask.subtasks = subtasks;

        const docRef = await addDoc(collection(this.firestore, "tasks"), this.addTask.toJSON());
        this.addTask.id = docRef.id;
        await updateDoc(doc(docRef.parent, this.addTask.id), this.addTask.toJSON());

    } catch (error) {
        console.error("Error adding the task:", error);
    }
}


async update(task: Task, status: string) {
  if (status !== "") {
    const docInstance = doc(this.firestore, 'tasks', task.id);  
    await updateDoc(docInstance, { status });
  }
}



  async deleteCategory(category: string) {
    try {
      const docRef = doc(this.firestore, category);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }
}
