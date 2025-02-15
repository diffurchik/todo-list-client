import {ApiService, CreateTaskPayload} from "./api.ts";
import {Task} from "./components/types.ts";
import { API_BASE_URL } from '../config.ts';



global.fetch = jest.fn()

describe('ApiService', () => {
    const api = new ApiService(API_BASE_URL);

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
        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks`, {
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
        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks/${fakeTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
    })

    it('should fetch all tasks successfully', async () => {
        const fakeTasks: Task[] = [
            { id: 1, title: 'Task 1', checked: false },
            { id: 2, title: 'Task 2', checked: true },
        ];

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => fakeTasks,
        });

        const result = await api.getAllTasks();

        expect(result).toEqual(fakeTasks);
        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks`, {
            method: 'GET',
        });
    });

    it('should throw an error when fetching tasks fails', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            text: async () => 'Internal Server Error',
        });

        await expect(api.getAllTasks()).rejects.toThrow(
            'Error fetching tasks: Internal Server Error'
        );
    });
})


    // it('should delete a task successfully', async () => {
    //     const taskId = 1;
    //
    //     (global.fetch as jest.Mock).mockResolvedValueOnce({
    //         ok: true,
    //     });
    //
    //     await api.deleteTask(taskId);
    //
    //     expect(fetch).toHaveBeenCalledWith(`${baseUrl}/tasks/${taskId}`, {
    //         method: 'DELETE',
    //     });
    // });
    //
    // it('should throw an error when task deletion fails', async () => {
    //     const taskId = 1;
    //
    //     (global.fetch as jest.Mock).mockResolvedValueOnce({
    //         ok: false,
    //         text: async () => 'Deletion failed',
    //     });
    //
    //     await expect(api.deleteTask(taskId)).rejects.toThrow(
    //         'Error deleting task: Deletion failed'
    //     );
    // });
