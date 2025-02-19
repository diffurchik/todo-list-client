import {FC, useEffect} from "react";
import {useAppContext} from "../../appContext.tsx";
import {Task} from "../../Task.ts";
import {TaskComponent} from "./TaskComponent.tsx";
import { TasksWorker } from "../TasksWorker.ts";    
import { TasksFilter } from "../types.ts";
    
export const TasksList: FC = () => {

    const {setAllTasks, filter, filteredTasks } = useAppContext()

    useEffect(() => {   
        const tasksWorker = new TasksWorker()
        tasksWorker.getAllTasks().then((list) => {
            if (list) {
                setAllTasks(list.map(task => new Task( 
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
    }, [setAllTasks])

    return <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 24, marginBottom: 50, fontWeight: 600, textAlign: 'left' }}>            
            {filter === TasksFilter.ALL && <div>All incoming tasks </div>}
            {filter === TasksFilter.TODAY && <div>Today</div>}
            {filter === TasksFilter.TOMORROW && <div>Tomorrow</div>}
            {filter === TasksFilter.WEEKEND && <div>Weekend</div>}

        </div>
        
        {filteredTasks.length !== 0 ? filteredTasks.map((task: Task, index: number) =>
            <TaskComponent task={task} index={index}/>) :
            <p>You don't have incomplete tasks for this filter</p>
        }
    </div>
}