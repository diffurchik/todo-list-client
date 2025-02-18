import { TasksWorker } from "./components/TasksWorker.ts";
import {ITask} from "./ITask.ts";

export class Task implements ITask {
    id: number;
    title: string;
    checked?: boolean;
    priority?: number;
    description?: string;
    dueDate: Date;
    repeated?: boolean;

    constructor(data: ITask) {
        this.id = data.id;
        this.title = data.title;
        this.checked = data.checked;
        this.priority = data.priority;
        this.description = data.description;    
        this.dueDate = data.dueDate || new Date();
        this.repeated = data.repeated;
    }

    taskWorker = new TasksWorker();

    setTaskAsDone(): void {
        this.taskWorker.setTaskAsDone(this.id);
    }

    setTaskRepeated(repeated: boolean): void {
        this.taskWorker.setTaskRepeated(this.id, repeated);
    }

    isTaskDone(): boolean {
        return this.checked ?? false;
    }

    isTaskRepeated(): boolean {
        return this.repeated ?? false;
    }
}