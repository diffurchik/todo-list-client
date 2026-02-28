import * as React from "react";
import { useCallback, useState } from "react";
import { TaskMenu } from "./TaskMenu.tsx";
import { IconButton } from "../atom-components/IconButton.tsx";
import { Task } from "../../Task.ts";
import { getFormattedDueDate } from "../../utils.ts";
import { useAppContext } from "../../appContext.tsx";
import {
    MenuWrapper,
    RepeatIcon,
    TaskCheckbox,
    TaskDateText,
    TaskMetaRow,
    TaskRow,
    TaskSeparator,
    TaskTitleContainer,
    TaskTitleLabel
} from "./styles/task-component.style.tsx";

type Props = {
    index: number;
    task: Task
}

export const TaskComponent: React.FC<Props> = ({task }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isHovered, setHovered] = useState<boolean>(false)
    const { setAllTasks } = useAppContext()

    const onMenuClick = useCallback(() => {
        setIsMenuOpen((prev) => !prev)
    }, [])

    const onMenuClose = useCallback(() => {
        setIsMenuOpen(false)
    }, [])

    const onTaskHover = useCallback(() => {
        setHovered(true)
    }, [])

    const onTaskUnHover = useCallback(() => {
        setHovered(false)
    }, [])

    const updateTask = useCallback((updater: (t: Task) => void) => {
        setAllTasks(prev => prev.map(i => {
            if (i.id === task.id) {
                updater(i)
            }
            return i
        }
        ))
    }, [setAllTasks, task])

    const onDueDateChange = useCallback((date: Date) => {
        task.setTaskDueTo(date)
        
        updateTask(t => t.dueDate = date)
    }, [setAllTasks, task])

    const clickCheckbox = useCallback(() => {
        const isChecked = task.checked;
        task.setTaskCompleted(!isChecked);
        updateTask(t => t.checked = !isChecked)
    }, [task])

    const formattedDueDate = getFormattedDueDate(task.dueDate);

    return (
        <>

            <TaskRow onMouseEnter={onTaskHover} onMouseLeave={onTaskUnHover}>
                <TaskTitleContainer>
                    <TaskCheckbox
                        type={"checkbox"}
                        id={`task_${task.id}`}
                        checked={task.checked}
                        onChange={clickCheckbox}
                    />
                    <TaskTitleLabel htmlFor={`task_${task.id}`} $checked={task.checked}>
                        {task.title}
                    </TaskTitleLabel>
                </TaskTitleContainer>
                <MenuWrapper $isHovered={isHovered}>
                    <IconButton icon={"/three-dot.svg"} onClick={onMenuClick} height={20} width={20} />
                </MenuWrapper>

                {isMenuOpen && <TaskMenu task={task} onMenuClose={onMenuClose} onDueDateChange={onDueDateChange} />}
            </TaskRow>
            <TaskMetaRow>
                <TaskDateText $isOverdue={task.isTaskOverdue()}>{`${formattedDueDate}`}</TaskDateText>
                {task.isTaskRepeated() && <RepeatIcon src={"/repeat.svg"} alt="repeat" />}
            </TaskMetaRow>
            <TaskSeparator />
        </>
    )
}