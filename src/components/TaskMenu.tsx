import styles from './styles/task-menu.module.css'
import {useCallback, useState} from "react";
import {SetDataComponent} from "./SetDataComponent.tsx";
import {Task} from "./types.ts";

type Props = {
    task: Task
}

export const TaskMenu: React.FC<Props> = ({task}: Props) => {

    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const handleDelete = useCallback(() => {

    }, [])

    const handleSetDate = useCallback(() => {
        setIsCalendarOpen((prev) => !prev)
    }, [])

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-145%',
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    zIndex: 10
                }}
            >
                <ul className={styles.task_menu}>
                    <li style={{padding: '5px', cursor: 'pointer'}} onClick={handleSetDate}>
                        <img src="/calendar.svg" alt="Delete" width="16" height="16" style={{marginRight: '8px'}}/>
                        Set date
                    </li>
                    <li style={{padding: '5px', cursor: 'pointer'}}>
                        <img src="/postpone-arrow.svg" alt="Delete" width="16" height="16"
                             style={{marginRight: '8px', opacity: 0.65}}/>
                        Postpone to tomorrow
                    </li>
                    <hr style={{opacity: 0.5}}/>
                    <li className={styles.delete} onClick={handleDelete}>
                        <img src="/trash.svg" alt="Delete" width="16" height="16" style={{marginRight: '8px'}}/>
                        Delete task
                    </li>
                </ul>
            </div>
            {isCalendarOpen && <SetDataComponent task={task}/>}
        </>
    )
}