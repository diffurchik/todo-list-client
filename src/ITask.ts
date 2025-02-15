export interface ITask {
    id: number;
    title: string;
    checked?: boolean;
    priority?: number;
    description?: string;
    dueDate?: Date;
}