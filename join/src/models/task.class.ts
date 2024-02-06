export class Task {
    id: string;
    status: string; 
    title: string;
    categoryColor: string;
    description: string;
    assigned: string;
    initials: string[]; // Initialen hinzufügen
    initialColors: string[]; // Farben hinzufügen
    date: string;
    prio: string;
    category: string;
    subtasks: string[];

    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.status = obj && obj.status || "";
        this.title = obj && obj.title || "";
        this.categoryColor = obj && obj.categoryColor || "";
        this.description = obj && obj.description || "";
        this.assigned = obj && obj.assigned || "";
        this.initials = obj && obj.initials || []; 
        this.initialColors = obj && obj.initialColors || []; 
        this.date = obj && obj.date || "";
        this.prio = obj && obj.prio || "";
        this.category = obj && obj.category || "";
        this.subtasks = obj && obj.subtasks || [];
    }

    toJSON() {
        return {
            id: this.id,
            status: this.status,
            title: this.title, 
            categoryColor: this.categoryColor,
            description: this.description,
            assigned: this.assigned,
            initials: this.initials, // Initialen serialisieren
            initialColors: this.initialColors, // Farben serialisieren
            date: this.date,
            prio: this.prio,
            category: this.category,
            subtasks: this.subtasks,
        };
    }
}