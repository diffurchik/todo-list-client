import {Task} from "./components/types.ts";


export interface CreateTaskPayload {
    title: string;
}

export class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async createTask(payload: CreateTaskPayload): Promise<Task> {
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
        payload: Partial<Pick<Task, 'checked' | 'title'>>
    ): Promise<Task> {
        const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        console.log('payload', payload);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error updating task: ${errorText}`);
        }

        const data = await response.json();
        return data.task;
    }
}