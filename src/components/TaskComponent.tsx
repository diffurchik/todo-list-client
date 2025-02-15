import * as React from "react";
import {useCallback, useState} from "react";
import {Task} from "./types.ts";
import {ApiService} from "../api.ts";
import {TaskMenu} from "./TaskMenu.tsx";

type Props = {
    index: number;
    task: Task
}

const api = new ApiService('http://localhost:3000')

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
        console.log('isMenuOpen:', isMenuOpen)
    }, [isMenuOpen])

    const onTaskHover = useCallback(() => {
        setHovered((prev) => !prev)
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
                 onMouseLeave={onTaskHover}>
                <div
                    style={{
                        // marginBottom: 10,
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
                <button
                    onClick={onMenuClick}
                    style={{
                        background: isMenuOpen ? '#eaeded' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                        opacity: isHovered ? 1 : 0,
                        marginRight: 4
                    }}
                >
                    <img src="/three-dot.svg" alt="drop-down menu of task" width="15" height="15"/>
                </button>

                {isMenuOpen && <TaskMenu task={task}/>}
            </div>
            <div style={{fontSize: 12}}>{`due date: ${formattedDueDate}`}</div>
            <hr style={{opacity: 0.3}}/>
        </>
    )
}