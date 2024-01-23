import { Injectable, EventEmitter} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, updateDoc, doc, getDocs, onSnapshot, query, setDoc, where, getDoc, deleteDoc } from "firebase/firestore";
import { User } from '../models/user.class';
import { Category } from '../models/category.class';



@Injectable({
    providedIn: 'root'
})
export class CategoryFirebaseService {

    public loadedCategory: Category[] = [];
    
    public unsubCategory: any;

    public finishedLoading: boolean = false;
    
    public currentCategory: Category = new Category();

    public registUser: User = new User();
    
    
    constructor(private firestore: Firestore) {
    }

    /**
     * Sets the given Userdata to the current user. 
     * @param UserData - User to be set to current user. 
     */
    setCurrentUser(CategoryData: any) {
        this.currentCategory = new Category(CategoryData);
    }

    /**
    * Asynchronously loads user data from Firestore based on optional index parameters.
    */
    async load(){
        const q = query(collection(this.firestore, "category"));
        try {
          const querySnapshot = await getDocs(q);
          this.loadedCategory = [];
          this.finishedLoading = false;

          querySnapshot.forEach((doc) => {
            const category = new Category(doc.data());
            category.id = doc.id;
            this.loadedCategory.push(category);
            
          });
          this.finishedLoading = true;
        } catch (error) {
          console.error('Error during query:', error);
        }
      }

    /**
    * Updates Or Creates a user document in Firestore.
    * Depending on if user.id is given
    * @param {User} user - The user object to be updated or created.
     */
    async update(user: User, userId: string) {
        if (userId !== "") {
            const docInstance = doc(this.firestore, 'users', userId);
            await updateDoc(docInstance, user.toJSON());
        }
    }


     /**
   * Löscht einen Benutzer anhand seiner ID aus Firestore.
   * @param userId - Die ID des zu löschenden Benutzers.
   */
     async deleteUserById(userId: string) {
        try {
          const docRef = doc(this.firestore, 'users', userId);
          await deleteDoc(docRef);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }


    // In Ihrer UserFirebaseService-Klasse
    async addNewUserData(name: string, email: string, phone: string) {
        try {
            this.registUser.fullName = name;
            this.registUser.mail = email;
            this.registUser.phone = phone;
    
            const contactRef = doc(collection(this.firestore, "users"));
            await setDoc(contactRef, this.registUser.toJSON());
            this.load();

        } catch (error) {
            console.error("Fehler beim Hinzufügen des Kontakts:", error);
        }
    }


    /**
     * Creates a new User with a Custom ID. To create a new User you should take UID from Firebase Authentication.  
     * 
     * @param user - new User
     * @param UID - UID from Authentication
     */
    async addNewUserWithUID(user: User, UID: string) {
        setDoc(doc(this.firestore, "users", UID), user.toJSON());
    }


    /**
     * Registers a user with a given UID from authentication. 
     * @param UID - UID from Authentication
     */
    async addRegistUserWithUID(UID: string) {
        setDoc(doc(this.firestore, "users", UID), this.registUser.toJSON());
    }


    /**
     *Returns a User for a given User UID. 
     * 
     * @param UID - Unique ID of User
     * @returns - User-Objekt
     */
    async getUserByUID(UID: string) {
        let user = this.loadedCategory.find(category => category.id === UID);
        
        if (user) {
            return user;
        } else {
            if (UID != "") {
                const docRef = await doc(this.firestore, "users", UID);
                const docSnap = await getDoc(docRef);
                let user = new User(docSnap.data());
                user.id = docSnap.id;
                return user;
            } else {
                return new User();
            }
        }
    }

    /**
     * Sets a User with a given UID to the current logged in User
     * @param UID - Unique ID of User
     */
    async setUIDToCurrentUser(UID: string) {
        const category = await this.getUserByUID(UID);
        this.currentCategory = new Category(category);
    }

 
   
}