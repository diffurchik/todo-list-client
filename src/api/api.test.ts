import { describe, it, expect, afterEach, vi } from 'vitest'
import { API_BASE_URL } from "../../config";
import { TaskData } from "../components/types";
import { ApiService, CreateTaskPayload } from "./api";

const fetchMock = vi.fn()
global.fetch = fetchMock as unknown as typeof fetch

describe('ApiService', () => {
    const api = new ApiService(API_BASE_URL);

    afterEach(() => {
        fetchMock.mockReset();
    });

    it('should create a new task', async () => {
        const fakeTask: TaskData = {id: 1, title: 'Test Task', checked: false};
        const payload: CreateTaskPayload = {title: 'Test Task'};

        fetchMock.mockResolvedValueOnce({
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
        fetchMock.mockResolvedValueOnce({
            ok: false,
            text: async () => 'Bad Request',
        });

        await expect(api.createTask({title: 'Test Task'})).rejects.toThrow(
            'Error creating task: Bad Request'
        );
    });

    it('should update a task', async () => {
        const fakeTask: TaskData = {id: 1, title: 'Test Task'};
        const payload: CreateTaskPayload = {title: 'new title'};

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
              task: { id: 1, title: 'new title' },
            }),
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
        const fakeTasks: TaskData[] = [
            { id: 1, title: 'Task 1', checked: false },
            { id: 2, title: 'Task 2', checked: true },
        ];

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => fakeTasks,
        });

        const result = await api.getAllTasks();

        expect(result).toEqual(fakeTasks);
        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks`)
    });

    it('should throw an error when fetching tasks fails', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            text: async () => 'Internal Server Error',
        });

        await expect(api.getAllTasks()).rejects.toThrow(
            'Error creating task: Internal Server Error'
          );
    });
})
