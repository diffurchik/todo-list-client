import {ITask} from "./ITask.ts";

export class Task implements ITask {
    id: number;
    title: string;
    checked?: boolean;
    priority?: number;
    description?: string;
    dueDate?: Date;

    constructor(data: ITask) {
        this.id = data.id;
        this.title = data.title;
        this.checked = data.checked;
        this.priority = data.priority;
        this.description = data.description;
        this.dueDate = data.dueDate;
    }

    getFormattedDueDate(): string {
        return this.dueDate
            ? new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'long'
            }).format(this.dueDate)
            : '';
    }

    toApiDTO() {
        return {
            id: this.id,
            title: this.title,
            checked: this.checked,
            priority: this.priority,
            description: this.description,
            due_date: this.dueDate ? this.dueDate.toISOString() : null,
        };
    }
}