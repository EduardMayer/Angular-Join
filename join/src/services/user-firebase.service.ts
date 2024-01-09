import { Injectable, EventEmitter} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, updateDoc, doc, getDocs, onSnapshot, query, setDoc, where, getDoc } from "firebase/firestore";
import { User } from '../models/user.class';



@Injectable({
    providedIn: 'root'
})
export class UserFirebaseService {

    public loadedUsers: User[] = [];

    public userGroups: { initial: string, users: any[] }[] = [];
    
    public unsubUsers: any;

    public finishedLoading: boolean = false;
    
    public loadedUser: User | undefined;

    public currentUser: User = new User();

    public registUser: User = new User();
    
    
    constructor(private firestore: Firestore) {
    }

    /**
     * Sets the given Userdata to the current user. 
     * @param UserData - User to be set to current user. 
     */
    setCurrentUser(UserData: any) {
        this.currentUser = new User(UserData);
    }

    /**
    * Asynchronously loads user data from Firestore based on optional index parameters.
    */
    async load(){
        const q = query(collection(this.firestore, "users"));
        try {
          const querySnapshot = await getDocs(q);
          this.loadedUsers = [];
          this.finishedLoading = false;

          querySnapshot.forEach((doc) => {
            const user = new User(doc.data());
            user.id = doc.id;
            this.loadedUsers.push(user);
            
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
    async update(user: User) {
        if (user.id != "") {
            const docInstance = doc(this.firestore, 'users', user.id);
            updateDoc(docInstance, user.toJSON());
        }
    }


    // In Ihrer UserFirebaseService-Klasse
    async addNewUserData(name: string, email: string, phone: number) {
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

    
    async groupUsersByInitial() {
        this.userGroups = [];
        this.loadedUsers.forEach(user => {
          const initial = user.fullName.charAt(0).toUpperCase();
          const existingGroup = this.userGroups.find(group => group.initial === initial);
    
          if (existingGroup) {
            existingGroup.users.push(user);
          } else {
            this.userGroups.push({ initial, users: [user] });
          }
        });
        this.userGroups.sort((a, b) => a.initial.localeCompare(b.initial));
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
        let user = this.loadedUsers.find(user => user.id === UID);
        
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
        const user = await this.getUserByUID(UID);
        this.currentUser = new User(user);
    }

    /**
     * Updates given email adress for current User
     * @param newEmail - new email
     */
    updateEmail(newEmail: string) {
        this.currentUser.mail = newEmail;
        this.update(this.currentUser);
    }

    /**
     * Update the current user in firestore database.
     */
    async updateCurrentUserToFirebase() {
        this.update(this.currentUser);
    }

    /**
     * Chechs if email is same as the given (authentication) and updates in firestore database.
     * @param email - email adress of authentication
     */
    async syncMail(email: string) {
        if (this.currentUser.mail != email) {
            this.currentUser.mail = email;
            this.updateCurrentUserToFirebase();
        }
    }

    /**
     * Search for Substring in users fullname element and returns if its matches. 
     * @param searchString - seachstring
     * @returns [Users] - Array of find users. 
     */
    async getUserForSearch(searchString: string) {
        const searchKeywords = searchString.split(" ");
        const q = query(collection(this.firestore, "users"),
            where("fullName", ">=", searchString),
            where("fullName", "<=", searchString + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const findUsers: User[] = [];
        querySnapshot.forEach((doc) => {
            findUsers.push(new User(doc.data()))
        });
        return findUsers;
    }

  
    /**
     * Check if a given email exists in the array of loaded users.
     *
     * @param {string} mail - The email to check for in the user data.
     * @returns {boolean} Returns `true` if the email exists in the loaded users, or `false` otherwise.
     */
    mailExists(mail: string) {
         this.load();
        if (this.loadedUsers[0]) {
            for (let i = 0; i < this.loadedUsers.length; i++) {
                if (this.loadedUsers[i].mail === mail) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }

   
}