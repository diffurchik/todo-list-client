import {Task, TaskDTO} from "./components/types.ts";

export const taskDTOToTaskMapper = (tasks: TaskDTO[]): Task[]| undefined => {
    if(!tasks.length) return
    console.log(tasks)
    return tasks.map((item: TaskDTO) => taskMapper(item))
}

const taskMapper = (task: TaskDTO): Task => {
    return {
        id: task.id,
        title: task.title,
        checked: task.checked,
        description: task.description,
        priority: task.priority,
        dueDate: task.due_date
    }
}