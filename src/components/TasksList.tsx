import {FC, useEffect, useState} from "react";

type Task = {
    title: string
    completed: boolean
}

export const TasksList: FC = () => {

    const [tasks, setTasks] = useState<Task[]>([])


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
                <input type={"checkbox"} id={`task_${index}`} style={{marginRight: 8}}/>
                <label htmlFor={`task_${index}`}>{task.title}</label>
            </div>) :
            <p>You don't have incomplete tasks</p>
        }
    </div>
}