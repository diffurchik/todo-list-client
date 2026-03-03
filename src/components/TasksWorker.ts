import { API_BASE_URL } from "../../config";
import { ApiService } from "../api/api";
import { Task } from "../domain/Task";
import { taskDTOToTaskMapper } from "../domain/utils";

import { TaskData, TaskDTO } from "./types";

export class TasksWorker {
  private api = new ApiService(API_BASE_URL);
  tasksList: TaskData[] | undefined;

  getAllTasks(): Promise<TaskData[] | undefined> {
    return this.api.getAllTasks().then((list) => {
      return taskDTOToTaskMapper(list);
    });
  }

  setTaskCompleted(taskId: number, completed: boolean): Promise<TaskData> {
    return this.api.updateTask(taskId, {
      completed,
    });
  }

  setTaskRepeated(taskId: number, repeated: boolean): Promise<TaskData> {
    return this.api.updateTask(taskId, {
      repeated: repeated,
    });
  }

  updateTask(taskId: number, payload: Partial<Pick<TaskDTO, 'completed' | 'title' | 'dueDate' | 'repeated'>>): Promise<TaskData> {
    return this.api.updateTask(taskId, payload);
  }

  deleteTask(taskId: Task["id"]): Promise<void> {
    return this.api.deleteTask(taskId)
  }

  async getTaskByDate(date: Date, tasks: TaskData[]): Promise<TaskData[]> {
      return tasks?.filter((task: TaskData) => {
          return task.dueDate &&
              (task.dueDate instanceof Date ?
                  task.dueDate.toDateString() === date.toDateString() :
                  new Date(task.dueDate).toDateString() === date.toDateString()
              );
      }) || [];
  }
}