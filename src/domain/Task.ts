
import { TasksWorker } from "../components/TasksWorker.ts";
import { ITask } from "./ITask.ts";

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

    setTaskDueTo(date: Date): void {
        this.dueDate = date
        this.taskWorker.updateTask(this.id, {dueDate: date.toISOString()});
    }

    setTaskCompleted(completed: boolean): void {
        this.taskWorker.setTaskCompleted(this.id, completed);
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

    isTaskOverdue() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(this.dueDate);
        due.setHours(0, 0, 0, 0);
        return due < today && !this.checked;
    }
}