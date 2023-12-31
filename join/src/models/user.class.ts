export class User {
    id: string;
    fullName:string;
    mail: string;
    
    
    constructor(obj?: any) {
        this.id = obj ? obj.id : "";
        this.fullName = obj ? obj.fullName : "";
        this.mail = obj ? obj.mail : "";
    }

    toJSON() {
        return {
            id: this.id,
            fullName: this.fullName,
            mail: this.mail,
        }
    }
}