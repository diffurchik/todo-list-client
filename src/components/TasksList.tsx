import {FC, useEffect} from "react";
import {useAppContext} from "./appContext.tsx";
import {Task} from "./types.ts";
import {TaskComponent} from "./TaskComponent.tsx";

export const TasksList: FC = () => {

    const {tasks, setTasks} = useAppContext()

    useEffect(() => {
        let list: Task[] = []
        const fetchData = async () => { // TODO: need to move this function to api.ts class
            list = await fetch('http://localhost:3000/tasks')
                .then(res => res.json())
                .catch(err => console.error(err))
            setTasks(list)
        }
        fetchData().catch(err => console.error(err))
    }, [setTasks])

    return <div style={{marginTop: 50}}>
        {tasks.length !== 0 ? tasks.map((task: Task, index) =>
            <TaskComponent index={index} task={task}/>) :
            <p>You don't have incomplete tasks</p>
        }
    </div>
}