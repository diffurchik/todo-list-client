import * as React from "react";
import {useCallback, useState} from "react";
import {TaskMenu} from "./TaskMenu.tsx";
import {IconButton} from "../atom-components/IconButton.tsx";
import { Task } from "../../Task.ts";
import { getFormattedDueDate } from "../../utils.ts";

type Props = {
    index: number;
    task: Task
}

export const TaskComponent: React.FC<Props> = ({index, task}: Props) => {
    const [checked, setChecked] = useState<boolean>(task.checked ?? false)
    const [dueDate, setDueDate] = useState<Date>(task.dueDate)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isHovered, setHovered] = useState<boolean>(false)

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

    const onDueDateChange = useCallback((date: Date) => {
        setDueDate(date)
    }, [])

    const clickCheckbox = useCallback(() => {
        const isChecked = !checked;
        task.setTaskCompleted(isChecked);
        setChecked(isChecked);
    }, [task, checked])

    const formattedDueDate = getFormattedDueDate(dueDate);

    return (
        <>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                width: 200,
                marginBottom: '10px',
            }} onMouseEnter={onTaskHover}
                 onMouseLeave={onTaskUnHover}>
                <div
                    style={{
                        color: 'black',
                        padding: 5,
                        textAlign: 'left',
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <input type={"checkbox"} id={`task_${index}`}
                           style={{marginRight: 12, cursor: 'pointer', transform: 'scale(1.4)'}} checked={checked}
                           onChange={clickCheckbox}/>
                    <label htmlFor={`task_${index}`}
                           style={{textDecoration: checked ? 'line-through' : ''}}>{task.title}</label>
                </div>
                <div style={{opacity: isHovered ? 1 : 0}}>
                    <IconButton icon={"/three-dot.svg"} onClick={onMenuClick} height={20} width={20}/>
                </div>

                {isMenuOpen && <TaskMenu task={task} onMenuClose={onMenuClose} onDueDateChange={onDueDateChange}/>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{fontSize: 12}}>{`date: ${formattedDueDate}`}</div>
                {task.isTaskRepeated() && <img src={"/repeat.svg"} alt="repeat" style={{ width: 15, height: 15 }} />}
            </div>
            <hr style={{opacity: 0.3}}/>
        </>
    )
}