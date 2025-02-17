import styles from '../styles/task-menu.module.css'
import {useCallback, useRef, useState, useEffect} from "react";
import {SetDataComponent} from "./SetDataComponent.tsx";
import {Task} from "../types.ts";
import { RepeatMenuComponent } from './RepeatMenuComponent.tsx';

type Props = {
    task: Task,
    onMenuClose: () => void
}

export const TaskMenu: React.FC<Props> = ({task, onMenuClose}: Props) => {

    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [isRepeatOpen, setIsRepeatOpen] = useState<boolean>(false);   
    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const calendarElement = document.querySelector('#calendar-container');
            const repeatElement = document.querySelector('#repeat-menu');
            if (
                menuRef.current && 
                !menuRef.current.contains(event.target as Node) && 
                (!calendarElement || !calendarElement.contains(event.target as Node)) &&
                (!repeatElement || !repeatElement.contains(event.target as Node))
            ) {
                onMenuClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onMenuClose]);

    const handleRepeatOpen = useCallback(() => {
        setIsRepeatOpen((prev) => !prev)
    }, [])

    const handleRepeatClose = useCallback(() => {
        setIsRepeatOpen(false)
    }, [])

    const handleDelete = useCallback(() => {

    }, [])

    const handleSetDate = useCallback(() => {
        setIsCalendarOpen((prev) => !prev)
    }, [])

    return (
        <>
            <div
                ref={menuRef}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-110%',
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
                        <img src="/calendar-icon4.svg" alt="Delete" width="16" height="16"
                             style={{marginRight: '8px'}}/>
                        Set date
                    </li>
                    <li style={{padding: '5px', cursor: 'pointer', opacity: 0.5}}>
                        <img src="/tomorrow.svg" alt="Delete" width="16" height="16"
                             style={{marginRight: '8px', opacity: 0.65}}/>
                        Postpone to tomorrow
                    </li>
                    <li style={{padding: '5px', cursor: 'pointer'}} onClick={handleRepeatOpen}>
                        <img src="/tomorrow2.svg" alt="Repeat" width="16" height="16"
                             style={{marginRight: '8px', opacity: 0.65}}/>
                        Repeat task
                    </li>
                    <hr style={{opacity: 0.5}}/>
                    <li className={styles.delete} onClick={handleDelete}>
                        <img src="/trash.svg" alt="Delete" width="16" height="16" style={{marginRight: '8px'}}/>
                        Delete task
                    </li>
                </ul>
            </div>
            {isCalendarOpen && <SetDataComponent task={task} setIsCalendarOpen={setIsCalendarOpen}/>}
            {isRepeatOpen && <RepeatMenuComponent onClose={handleRepeatClose}/>}
        </>
    )
}