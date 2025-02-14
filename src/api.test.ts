import {ApiService, CreateTaskPayload} from "./api.ts";
import {Task} from "./components/types.ts";

global.fetch = jest.fn()

describe('ApiService', () => {
    const baseUrl = 'http://localhost:3000';
    const api = new ApiService(baseUrl);

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should create a new task', async () => {
        const fakeTask: Task = {id: 1, title: 'Test Task', checked: false};
        const payload: CreateTaskPayload = {title: 'Test Task'};

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({message: 'Test Task', task: fakeTask}),
        })

        const result = await api.createTask(payload);

        expect(result).toEqual(fakeTask);
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    })

    it('should throw an error when the API returns a non-ok response', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            text: async () => 'Bad Request',
        });

        await expect(api.createTask({title: 'Test Task'})).rejects.toThrow(
            'Error creating task: Bad Request'
        );
    });

    it('should update a task', async () => {
        const fakeTask: Task = {id: 1, title: 'Test Task'};
        const payload: CreateTaskPayload = {title: 'new title'};

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({message: 'New title'}),
        })
        const result = await api.updateTask(fakeTask.id, payload);
        expect(result).toEqual({id: 1, title: 'new title'});
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/tasks/${fakeTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
    })
})