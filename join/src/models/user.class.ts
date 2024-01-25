export class User {
    id: string;
    fullName: string;
    mail: string;
    phone: string;
    color : string;

    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.fullName = obj && obj.fullName || "";
        this.mail = obj && obj.mail || "";
        this.phone = obj && obj.phone || "";
        this.color = obj && obj.color || "";
    }

    toJSON() {
        return {
            id: this.id,
            fullName: this.fullName,
            mail: this.mail,
            phone: this.phone,
            color: this.color,
        };
    }
}