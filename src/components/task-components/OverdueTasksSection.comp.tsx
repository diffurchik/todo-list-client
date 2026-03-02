import { useCallback } from "react"
import { ButtonComponent } from "../atom-components/ButtonComponent"
import { TasksList } from "./TasksList.comp"
import { TasksSection } from "./TasksSection.comp"
import { useTasksActions } from "./hooks/useTasksActions"
import { Task } from "../../domain/Task.ts";

type Props = {
    tasks: Task[]
}

export const OverdueTasksSection: React.FC<Props> = ({ tasks }) => {
    const { bulkUpdateTasks } = useTasksActions();
    
    const handlePostponeAll = useCallback(() => {
        const today = new Date();
        tasks.forEach(t => t.setTaskDueTo(today))
        bulkUpdateTasks(
          t => t.isTaskOverdue(),
          t => t.setTaskDueTo(today),
        );
      }, [bulkUpdateTasks]);

    return (
        <>
            <TasksSection title="Overdue tasks" variant="overdue" 
            headerRight={
                <ButtonComponent
                    onClick={() => handlePostponeAll()}
                    hasIcon={false}
                    title="Postpone all"
                    size="medium"
                />
            }
            >
                <TasksList tasks={tasks} />
            </TasksSection>

        </>
    )
}