import {FC, useEffect} from "react";
import {useAppContext} from "./appContext.tsx";
import {Task} from "./types.ts";
import {TaskComponent} from "./TaskComponent.tsx";
import {ApiService} from "../api.ts";

const api = new ApiService('http://localhost:3000')
export const TasksList: FC = () => {

    const {tasks, setTasks} = useAppContext()

    useEffect(() => {
        let list: Task[] | undefined = []
        const fetchData = async () => { // TODO: need to move this function to api.ts class
            list = await api.getAllTasks()
            console.log('list', list)
            if(list) {

                setTasks(list)
            }
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