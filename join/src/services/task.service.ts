import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, addDoc, DocumentData, collection, query, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class TaskFirebaseService {

  public tasks: Task[] = []; 
  public finishedLoading = false;

  constructor(private firestore: Firestore) {
  }

  async load() {
    try {
      await this.loadTasks();
      this.finishedLoading = true;
      console.log("Data loaded successfully!");
    } catch (error) {
      console.error('Error during query:', error);
    }
  }

  private async loadTasks() {
    const todo = query(collection(this.firestore, "tasks"));
    await this.loadTasksFromSnapshot(todo, this.tasks); 
  }

  private async loadTasksFromSnapshot(query: any, taskArray: Task[]) {
    const snapshot = await getDocs(query);
    snapshot.forEach((doc) => {
      const task = new Task(doc.data());
      taskArray.push(task);
    });
  }

  async addNewTask(title: string, categoryColor: string, status: string, description: string, assigned: string, initials: string[], initialColors: string[], date: string, prio: string, category: string, subtasks: string[]) {
    try {
        const newTaskData = {
            title,
            categoryColor,
            status,
            description,
            assigned,
            initials,
            initialColors,
            date,
            prio,
            category,
            subtasks
        };

        const docRef = await addDoc(collection(this.firestore, "tasks"), newTaskData);
        const docSnap = await getDoc(docRef);
        let newTask = new Task(docSnap.data());
        newTask.id = docSnap.id;

        await updateDoc(doc(docRef.parent, newTask.id), newTask.toJSON());
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

  async getTaskByID(ID: string) {
    let task = this.tasks.find(task => task.id === ID);
    
    if (task) {
      return task;
    } else {
      if (ID !== "") {
        const docRef = doc(this.firestore, "tasks", ID);
        const docSnap = await getDoc(docRef);
        let task = new Task(docSnap.data());
        task.id = docSnap.id;
        return task;
      } else {
        return new Task();
      }
    }
  }
}
