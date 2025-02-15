export type Task = {
    id: number;
    title: string;
    checked?: boolean;
    priority?: number;
    description?: string;
    dueDate?: string | Date;
}

export type TaskDTO = {
        id: number;
        title: string;
        checked?: boolean;
        priority?: number;
        description?: string;
        due_date: string
}