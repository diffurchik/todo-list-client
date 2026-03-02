import { API_BASE_URL } from "../../../config";
import { ApiService } from "../../api/api";
import { useAppContext } from "../../app/appContext";
import { taskMapper } from "../../domain/utils";
import styles from "../../styles.module.css";
import {useCallback, useState, useRef} from "react";


const api = new ApiService(API_BASE_URL);

export const NewTask: React.FC = () => {

    const [newTask, setNewTask] = useState<string>('')
    const {setAllTasks} = useAppContext()
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
                    const createdTask = await api.createTask({title: newTask});
                    setAllTasks((prev) => {
                        return [...prev, taskMapper(createdTask)];
                    });
                    setNewTask('');
                } catch (err) {
                    console.log(err)
                }
            }
            sendData().catch(err => console.error(err))
            setNewTask('')
        }
    }, [newTask, setAllTasks])

    return (
        <input id='task-input' onChange={handleInput} onKeyDown={onKeyDown} placeholder={'Add new task'}
               value={newTask} style={{marginLeft: 4, marginTop: 30}} className={styles.todo_input}/>
    )
}