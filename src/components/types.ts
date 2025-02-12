export type Task = {
    id: number;
    title: string;
    checked?: boolean;
    priority?: number;
    description?: string;
    dueDate?: Date;
}

export type TaskDTO = {
    message: string,
    task: Task,
}