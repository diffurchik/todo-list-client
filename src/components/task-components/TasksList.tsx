import {FC, useEffect} from "react";
import {useAppContext} from "../../appContext.tsx";
import {Task} from "../../Task.ts";
import {TaskComponent} from "./TaskComponent.tsx";
import { TasksWorker } from "../TasksWorker.ts";    
import { TasksFilter } from "../types.ts";
    
export const TasksList: FC = () => {

    const { tasks, setTasks, tasksFilter } = useAppContext()

    useEffect(() => {
        const tasksWorker = new TasksWorker()
        tasksWorker.getAllTasks().then((list) => {
            if (list) {
                setTasks(list.map(task => new Task( 
                    {
                        id: task.id,
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate? new Date(task.dueDate) : new Date(),
                    checked: task.checked,
                    repeated: task.repeated
                    }
                )))
            }
        }).catch((error) => { 
            console.error(error)
        })
    }, [setTasks])

    return <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 24, marginBottom: 50, fontWeight: 600, textAlign: 'left' }}>            
            {tasksFilter === TasksFilter.ALL && <div>All</div>}
            {tasksFilter === TasksFilter.TODAY && <div>Today</div>}
            {tasksFilter === TasksFilter.TOMORROW && <div>Tomorrow</div>}
            {tasksFilter === TasksFilter.WEEKEND && <div>Weekend</div>}

        </div>
        
        {tasks.length !== 0 ? tasks.map((task: Task, index: number) =>
            <TaskComponent task={task} index={index}/>) :
            <p>You don't have incomplete tasks for this filter</p>
        }
    </div>
}