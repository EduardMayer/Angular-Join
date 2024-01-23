export class Category {
    id: string;
    colore: string;
    section: string;
    

    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.colore = obj && obj.colore|| "";
        this.section = obj && obj.section|| "";
    }

    toJSON() {
        return {
            id: this.id,
            colore: this.colore,
            section: this.section,
        };
    }
}