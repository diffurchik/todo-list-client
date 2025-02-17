import {FC, useEffect} from "react";
import {useAppContext} from "../../appContext.tsx";
import {Task} from "../types.ts";
import {TaskComponent} from "./TaskComponent.tsx";
import { TasksWorker } from "../TasksWorker.ts";    
    
export const TasksList: FC = () => {

    const {tasks, setTasks} = useAppContext()

    useEffect(() => {
        const tasksWorker = new TasksWorker()
        tasksWorker.getAllTasks().then((list) => {
            if (list) {
                setTasks(list)
            }
        }).catch((error) => {
            console.error(error)
        })
    }, [setTasks])

    return <div style={{marginTop: 50}}>
        {tasks.length !== 0 ? tasks.map((task: Task, index) =>
            <TaskComponent index={index} task={task}/>) :
            <p>You don't have incomplete tasks</p>
        }
    </div>
}