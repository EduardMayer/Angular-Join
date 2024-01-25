export class Category {
    color: string;
    section: string;
    

    constructor(obj?: any) {
        this.color = obj && obj.colore|| "";
        this.section = obj && obj.section|| "";
    }

    toJSON() {
        return {
            colore: this.color,
            section: this.section,
        };
    }
}