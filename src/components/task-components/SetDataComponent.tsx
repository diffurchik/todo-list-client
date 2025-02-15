import Calendar from "react-calendar";
import styles from "../styles/calendar.module.css"
import 'react-calendar/dist/Calendar.css';
import * as React from "react";
import {useCallback, useState} from "react";
import {ApiService} from "../../api.ts";
import {Task} from "../types.ts";
import {IconButton} from "../atom-components/IconButton.tsx";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const api = new ApiService('http://localhost:3000')


type Props = {
    task: Task,
    setIsCalendarOpen: (value: boolean) => void
}

export const SetDataComponent: React.FC<Props> = ({task, setIsCalendarOpen}: Props) => {
    const [value, onChange] = useState<Value>(new Date());

    const dateToFormat = Array.isArray(value) ? value[0] : value;

    const formattedDate = dateToFormat
        ? new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short'
        }).format(dateToFormat)
        : 'No date selected';

    const handleSetDateClick = useCallback(async () => {
        try {
            if (dateToFormat) {
                const updatedTask = await api.updateTask(task.id, {dueDate: dateToFormat});
                console.log('Updated Task:', updatedTask);
            }
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    }, [dateToFormat, task.id])

    const onBackButtonClick = useCallback(() => {
        setIsCalendarOpen(false)
    }, [setIsCalendarOpen])

    return (
        <div style={{
            position: 'absolute',
            top: '20%',
            right: '-145%',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '5px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            zIndex: 11,
            width: 250
        }}>
            {/*<button style={{*/}
            {/*    width: 20, height: 20, backgroundColor: "transparent", padding: 0,*/}
            {/*    display: 'flex',*/}
            {/*    alignItems: 'center',*/}
            {/*    justifyContent: 'center',*/}
            {/*}} onClick={onBackButtonClick}>*/}
            {/*    <img src="/arrow-left.svg" alt="drop-down menu of task" width="15" height="15"/>*/}
            {/*</button>*/}
            <IconButton icon={"/arrow-left.svg"} width={20} height={20} onClick={onBackButtonClick}/>
            <Calendar className={styles.react_calendar} onChange={onChange} value={value}/>
            <button className={styles.set_date_button} onClick={handleSetDateClick}>{`Set ${formattedDate}`}</button>
        </div>
    )
}