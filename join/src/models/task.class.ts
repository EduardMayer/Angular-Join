export class Task {
    id: string;
    fullName: string;
    mail: string;
    phone: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.fullName = obj && obj.fullName || "";
        this.mail = obj && obj.mail || "";
        this.phone = obj && obj.phone || "";
    }

    toJSON() {
        return {
            id: this.id,
            fullName: this.fullName, 
            mail: this.mail,
            phone: this.phone,
        };
    }
}