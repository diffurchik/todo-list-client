import { API_BASE_URL } from "../../config";
import { ApiService } from "../api";
import { taskDTOToTaskMapper } from "../utils";
import { Task } from "./types";

export class TasksWorker {
  private api = new ApiService(API_BASE_URL);
  tasksList: Task[] | undefined;

  getAllTasks(): Promise<Task[] | undefined> {
    return this.api.getAllTasks().then((list) => {
      return taskDTOToTaskMapper(list);
    });
  }

  setTaskCompleted(taskId: number, completed: boolean): Promise<Task> {
    return this.api.updateTask(taskId, {
      completed,
    });
  }

  setTaskRepeated(taskId: number, repeated: boolean): Promise<Task> {
    return this.api.updateTask(taskId, {
      repeated: repeated,
    });
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