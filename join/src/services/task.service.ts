import { Injectable} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, updateDoc, doc, getDocs, onSnapshot, query, setDoc, where, getDoc, deleteDoc } from "firebase/firestore";
import { Task } from '../models/task.class';



@Injectable({
    providedIn: 'root'
})
export class TaskFirebaseService {

    public loadedTask: Task[] = [];
    
    public unsubTask: any;

    public finishedLoading: boolean = false;
    
    public addTask: Task = new Task();
    
    constructor(private firestore: Firestore) {
    }


    async load(){
        const q = query(collection(this.firestore, "todo"));
        try {
          const querySnapshot = await getDocs(q);
          this.loadedTask = [];
          this.finishedLoading = false;

          querySnapshot.forEach((doc) => {
            const task = new Task(doc.data());
            this.loadedTask.push(task);
            
          });
          this.finishedLoading = true;
        } catch (error) {
          console.error('Error during query:', error);
        }
      }

   
    async addNewTask(title: string, description: string, assigned: string, date: string, prio: string, category: string, subtasks: string[],) {
        try {
            this.addTask.title = title; 
            this.addTask.description = description;
            this.addTask.assigned = assigned; 
            this.addTask.date = date;
            this.addTask.prio = prio;
            this.addTask.category = category; 
            this.addTask.subtasks = subtasks;
          
            const contactRef = doc(collection(this.firestore, "todo"));
            await setDoc(contactRef, this.addTask.toJSON());
            this.load();

        } catch (error) {
            console.error("Fehler beim Hinzufügen des Tasks:", error);
        }
    }


  
     async deleteCategory() {
        try {
          const docRef = doc(this.firestore, 'todo');
          await deleteDoc(docRef);
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      }


  
}