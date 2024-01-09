import { CollectionReference, DocumentData } from "firebase/firestore";

export class User {
    uid(arg0: CollectionReference<DocumentData, DocumentData>, uid: any) {
        throw new Error('Method not implemented.');
    }
    id: string;
    fullName:string;
    mail: string;
    phone: number;
    
    
    constructor(obj?: any) {
        this.id = obj ? obj.id : "";
        this.fullName = obj ? obj.fullName : "";
        this.mail = obj ? obj.mail : "";
        this.phone = obj ? obj.phone : "";
    }

    toJSON() {
        return {
            id: this.id,
            fullName: this.fullName,
            mail: this.mail,
            phone: this.phone,
        }
    }
}