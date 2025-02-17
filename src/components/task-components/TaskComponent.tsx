import * as React from "react";
import {useCallback, useState} from "react";
import {Task} from "../types.ts";
import {ApiService} from "../../api.ts";
import {TaskMenu} from "./TaskMenu.tsx";
import {IconButton} from "../atom-components/IconButton.tsx";
import { API_BASE_URL } from '../../../config.ts';
const api = new ApiService(API_BASE_URL);

type Props = {
    index: number;
    task: Task
}

export const TaskComponent: React.FC<Props> = ({index, task}: Props) => {
    const [checked, setChecked] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isHovered, setHovered] = useState<boolean>(false)

    const clickCheckbox = useCallback(async () => {
        setChecked((prev) => !prev)
        try {
            const updatedTask = await api.updateTask(task.id, {checked: !task.checked});
            console.log('Updated Task:', updatedTask);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    }, [task.checked, task.id])

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

    const formattedDueDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long'
    }).format(new Date(task.dueDate as Date));

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

                {isMenuOpen && <TaskMenu task={task} onMenuClose={onMenuClose}/>}
            </div>
            <div style={{fontSize: 12}}>{`due date: ${formattedDueDate}`}</div>
            <hr style={{opacity: 0.3}}/>
        </>
    )
}