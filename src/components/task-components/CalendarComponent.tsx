import Calendar from "react-calendar";
import styles from "../styles/calendar.module.css"
import 'react-calendar/dist/Calendar.css';
import * as React from "react";
import {useCallback, useState} from "react";
import {ApiService} from "../../api.ts";
import {Task} from "../../Task.ts";
import {IconButton} from "../atom-components/IconButton.tsx";
import { API_BASE_URL } from '../../../config.ts';
const api = new ApiService(API_BASE_URL);

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
    task: Task,
    setIsCalendarOpen: (value: boolean) => void
    onDueDateChange: (date: Date) => void
}

export const CalendarComponent: React.FC<Props> = ({task, setIsCalendarOpen, onDueDateChange}: Props) => {
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
                await api.updateTask(task.id, {dueDate: dateToFormat.toISOString()}); // move to task worker
                onDueDateChange(dateToFormat);
                setIsCalendarOpen(false)
            }
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    }, [dateToFormat, task.id, setIsCalendarOpen])

    const onBackButtonClick = useCallback(() => {
        setIsCalendarOpen(false)
    }, [setIsCalendarOpen])

    return (
        <div id = 'calendar-container' style={{
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
            <IconButton icon={"/arrow-left.svg"} width={20} height={20} onClick={onBackButtonClick}/>
            <Calendar className={styles.react_calendar} onChange={onChange} value={value}/>
            <button className={styles.set_date_button} onClick={handleSetDateClick}>{`Set ${formattedDate}`}</button>
        </div>
    )
}