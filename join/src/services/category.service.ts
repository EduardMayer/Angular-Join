import { Injectable} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, updateDoc, doc, getDocs, onSnapshot, query, setDoc, where, getDoc, deleteDoc } from "firebase/firestore";
import { Category } from '../models/category.class';



@Injectable({
    providedIn: 'root'
})
export class CategoryFirebaseService {


    public loadedCategory: Category[] = [];
    
    public unsubCategory: any;

    public finishedLoading: boolean = false;
    
    public addCategory: Category = new Category();
    
    constructor(private firestore: Firestore) {
    }


    async load(){
        const q = query(collection(this.firestore, "category"));
        try {
          const querySnapshot = await getDocs(q);
          this.loadedCategory = [];
          this.finishedLoading = false;

          querySnapshot.forEach((doc) => {
            const category = new Category(doc.data());
            this.loadedCategory.push(category);
            
          });
          this.finishedLoading = true;
        } catch (error) {
          console.error('Error during query:', error);
        }
      }

   
    async addNewCategory(section: string, color: string, ) {
        try {
            this.addCategory.section = section; 
            this.addCategory.color = color;
          
            const contactRef = doc(collection(this.firestore, "category"));
            await setDoc(contactRef, this.addCategory.toJSON());
            this.load();

        } catch (error) {
            console.error("Fehler beim Hinzufügen der Category:", error);
        }
    }


  
     async deleteCategory() {
        try {
          const docRef = doc(this.firestore, 'category');
          await deleteDoc(docRef);
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      }


  
}