import styles from "../styles.module.css";
import {useCallback, useState, useRef} from "react";
import {useAppContext} from "../appContext.tsx";
import {ApiService} from "../api.ts";
import { API_BASE_URL } from '../../config.ts';
import { taskMapper } from "../utils.ts";

const api = new ApiService(API_BASE_URL);

export const NewTask: React.FC = () => {

    const [newTask, setNewTask] = useState<string>('')
    const {setTasks} = useAppContext()
    const timerRef = useRef<NodeJS.Timeout>();

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => setNewTask(title), 30)
    }, [])

    const onKeyDown = useCallback((e: React.KeyboardEvent) => {

        if (e.key === 'Enter') {
            const sendData = async () => {
                try {
                    const createdTask = await api.createTask({title: newTask}); //move to tasksWorker
                    setTasks((prev) => [...prev, taskMapper(createdTask)]);
                    setNewTask('');
                } catch (err) {
                    console.log(err)
                }
            }
            sendData().catch(err => console.error(err))
            setNewTask('')
        }
    }, [newTask, setTasks])

    return (
        <input id='task-input' onChange={handleInput} onKeyDown={onKeyDown} placeholder={'Add new task'}
               value={newTask} style={{marginLeft: 4, marginTop: 30}} className={styles.todo_input}/>
    )
}