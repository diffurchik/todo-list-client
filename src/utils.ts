import {TaskDTO} from "./components/types.ts";
import { Task } from "./Task.ts";

export const taskDTOToTaskMapper = (tasks: TaskDTO[]): Task[]| undefined => {
    if(!tasks.length) return
    return tasks.map((item: TaskDTO) => taskMapper(item))
}

export const taskMapper = (task: TaskDTO): Task => {
    return new Task({
        id: task.id,
        title: task.title,
        checked: task.checked,
        description: task.description,
        priority: task.priority,
        dueDate: task.due_date ? new Date(task.due_date) : new Date(),
        repeated: task.repeated,
    });
};

export const getFormattedDueDate = (dueDate: Date): string => {
    return dueDate
        ? new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long'
        }).format(dueDate)
        : '';
}