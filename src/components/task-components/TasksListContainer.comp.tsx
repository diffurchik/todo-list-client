import { useEffect } from "react"
import { TasksWorker } from "../TasksWorker"
import { Task } from "../../domain/Task.ts";
import { TasksList } from "./TasksList.comp"
import { useFilteredTasks } from "./hooks/useFilteredTasks"
import { TasksFilter } from "../types"
import { OverdueTasksSection } from "./OverdueTasksSection.comp"
import { TasksSection } from "./TasksSection.comp"
import { useAppContext } from "../../app/appContext.tsx";

export const TasksListContainer: React.FC = () => {
    const { setAllTasks, allTasks, filter } = useAppContext()
    const {overdueTasks, filteredTasks} = useFilteredTasks(allTasks, filter);

    let listTitle: string
    switch (filter) {
        case TasksFilter.ALL:
            listTitle = "All incoming tasks"
            break
        case TasksFilter.TODAY:
            listTitle = "Today"
            break
        case TasksFilter.TOMORROW:
            listTitle = "Tomorrow"
            break
        case TasksFilter.WEEKEND:
            listTitle = "Weekend"
            break
    }

    useEffect(() => {
        const tasksWorker = new TasksWorker()
        tasksWorker.getAllTasks().then((list) => {
            if (list) {
                setAllTasks(list.map(task => new Task(
                    {
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
                        checked: task.checked,
                        repeated: task.repeated
                    }
                )))
            }
        }).catch((error) => {
            console.error(error)
        })
    }, [setAllTasks])

    return (
        <>
            {overdueTasks.length > 0 && <OverdueTasksSection tasks={overdueTasks} />}
            <TasksSection title={listTitle}>
                <TasksList tasks={filteredTasks} />
            </TasksSection>
        </>
    )
}