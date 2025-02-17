import {ITask} from "./ITask.ts";

export class Task implements ITask {
    id: number;
    title: string;
    checked?: boolean;
    priority?: number;
    description?: string;
    dueDate?: Date;
    repeated?: boolean;
    
    constructor(data: ITask) {
        this.id = data.id;
        this.title = data.title;
        this.checked = data.checked;
        this.priority = data.priority;
        this.description = data.description;    
        this.dueDate = data.dueDate;
        this.repeated = data.repeated;
    }
}