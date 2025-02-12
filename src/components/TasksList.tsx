import {FC, useEffect} from "react";
import {useAppContext} from "./appContext.tsx";
import {Task} from "./types.ts";

export const TasksList: FC = () => {

    const {tasks, setTasks} = useAppContext()

    useEffect(() => {
        let list: Task[] = []
        const fetchData = async () => {
            list = await fetch('http://localhost:3000/tasks')
                .then(res => res.json())
                .catch(err => console.error(err))
            setTasks(list)
        }
        fetchData().catch(err => console.error(err))
    }, [])

    return <div style={{marginTop: 50}}>
        {tasks.length !== 0 ? tasks.map((task: Task, index) =>
            <div
                style={{marginBottom: 10, color: 'black', padding: 5, textAlign: 'left', display: "flex", flexDirection: "row", alignItems: "center"}}>
                <input type={"checkbox"} id={`task_${index}`} style={{marginRight: 6, cursor: 'pointer'}}/>
                <label htmlFor={`task_${index}`}>{task.title}</label>
            </div>) :
            <p>You don't have incomplete tasks</p>
        }
    </div>
}