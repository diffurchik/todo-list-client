import {Task, TaskDTO} from "./components/types.ts";



export interface CreateTaskPayload {
    title: string;
}

export class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAllTasks(): Promise<TaskDTO[]> {
        const response = await fetch(`${this.baseUrl}/tasks`)

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error creating task: ${errorText}`);
        }

        return await response.json();
    }

    async createTask(payload: CreateTaskPayload): Promise<TaskDTO> {
        const response = await fetch(`${this.baseUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error creating task: ${errorText}`);
        }

        const data = await response.json();
        return data.task;
    }

    async updateTask(
        id: number,
        payload: Partial<Pick<Task, 'checked' | 'title' | 'dueDate' | 'repeated'>>
    ): Promise<Task> {
        const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error updating task: ${errorText}`);
        }

        const data = await response.json();
        return data.task;
    }

    async deleteTask(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log('deleted task', response);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error deleting task: ${errorText}`);
        }
        const data = await response.json();
        return data.task;
    }
}