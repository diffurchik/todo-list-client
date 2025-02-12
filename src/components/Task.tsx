import * as React from "react";
import {useCallback, useState} from "react";
import {Task} from "./types.ts";
import {ApiService} from "../api.ts";

type Props = {
    // checked: boolean;
    index: number;
    task: Task

}

const api = new ApiService('http://localhost:3000')

export const TaskComponent: React.FC<Props> = ({index, task}: Props) => {
    const [checked, setChecked] = useState<boolean>(false)

    const clickCheckbox = useCallback(async () => {
        setChecked((prev) => !prev)
        try {
            const updatedTask = await api.updateTask(task.id, { checked: !task.checked });
            console.log('Updated Task:', updatedTask);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    }, [task.checked, task.id])

    return (
        <div
            style={{
                marginBottom: 10,
                color: 'black',
                padding: 5,
                textAlign: 'left',
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
            <input type={"checkbox"} id={`task_${index}`} style={{marginRight: 6, cursor: 'pointer', transform: 'scale(1.2)'}} checked={checked}
                   onChange={clickCheckbox}/>
            <label htmlFor={`task_${index}`} style={{textDecoration: checked? 'line-through' : ''}}>{task.title}</label>
        </div>
    )
}