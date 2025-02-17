import { API_BASE_URL } from "../../config";
import { ApiService } from "../api";
import { taskDTOToTaskMapper } from "../utils";
import { Task } from "./types";

export class TasksWorker {
    private api = new ApiService(API_BASE_URL);

    getAllTasks(): Promise<Task[] | undefined> {
        return this.api.getAllTasks().then((list) => {
            return taskDTOToTaskMapper(list)
        })
    }
}