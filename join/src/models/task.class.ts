export class Task {
    id: string;
    status: string; 
    title: string;
    description: string;
    assigned: string;
    date: string;
    prio: string;
    category: string;
    subtasks: string[];

    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.status = obj && obj.status || "";
        this.title = obj && obj.title || "";
        this.description = obj && obj.description || "";
        this.assigned = obj && obj.assigned || "";
        this.date = obj && obj.date || "";
        this.prio = obj && obj.prio || "";
        this.category = obj && obj.category || "";
        this.subtasks = obj && obj.subtasks || "";
    }

    toJSON() {
        return {
            id: this.id,
            status: this.status,
            title: this.title, 
            description: this.description,
            assigned: this.assigned,
            date: this.date,
            prio: this.prio,
            category: this.category,
            subtasks: this.subtasks,
        };
    }
}