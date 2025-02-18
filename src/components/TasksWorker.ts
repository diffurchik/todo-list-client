import { API_BASE_URL } from "../../config";
import { ApiService } from "../api";
import { taskDTOToTaskMapper } from "../utils";
import { Task } from "./types";

export class TasksWorker {
    private api = new ApiService(API_BASE_URL);
    tasksList: Task[] | undefined;
    // taskList = this.getAllTasks()

    getAllTasks(): Promise<Task[] | undefined> {
        return this.api.getAllTasks().then((list) => {
            return taskDTOToTaskMapper(list)
        })
    }

    setTaskAsDone(taskId: number): Promise<Task> { 
          return this.api.updateTask(taskId, {
            checked: true,
          })
    }

    setTaskRepeated(taskId: number, repeated: boolean): Promise<Task> {
        return this.api.updateTask(taskId, {
            repeated: repeated,
        })
    }
    async getTaskByDate(date: Date, tasks: Task[]): Promise<Task[]> {

        return tasks?.filter((task: Task) => {
            return task.dueDate && 
                (task.dueDate instanceof Date ? 
                    task.dueDate.toDateString() === date.toDateString() :
                    new Date(task.dueDate).toDateString() === date.toDateString()
                );
        }) || [];
    }
}