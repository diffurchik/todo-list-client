import {ButtonComponent} from "./atom-components/ButtonComponent.tsx";
import { useAppContext } from "../appContext.tsx";
import { useCallback } from "react";
import { TasksFilter } from "./types.ts";
import { TasksWorker } from "./TasksWorker.ts";

export const DayFilterComponent: React.FC = () => { 

    const {setTasksFilter, tasksFilter, tasks } = useAppContext()

    const handleFilterClick = useCallback(async (filter: TasksFilter) => { 
        setTasksFilter(filter)
        const tasksWorker = new TasksWorker()
        let data = new Date()
        switch (tasksFilter) {
            case TasksFilter.TODAY:
                data = new Date()
                break
            case TasksFilter.TOMORROW:
                data = new Date(data.setDate(data.getDate() + 1))
                break
            case TasksFilter.WEEKEND:
                data = new Date(data.setDate(data.getDate() + (6 - data.getDay()))) // fix it
                break
        }
        console.log('filter', await tasksWorker.getTaskByDate(data, tasks)) 
    }, [setTasksFilter, tasks, tasksFilter])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <ButtonComponent title={'Today'} onClick={() => handleFilterClick(TasksFilter.TODAY)} hasIcon={true} iconPath={'/today.svg'} size={'medium'}/>
            <ButtonComponent title={'Tomorrow'} onClick={() => handleFilterClick(TasksFilter.TOMORROW)} hasIcon={true} iconPath={'/tomorrow.svg'} size={'medium'}/>
            <ButtonComponent title={'Weekend'} onClick={() => handleFilterClick(TasksFilter.WEEKEND)} hasIcon={true} iconPath={'/weekend.svg'} size={'medium'}/>
            <div style={{marginTop:60}}>
                <ButtonComponent title={'Incoming'} onClick={() => handleFilterClick(TasksFilter.ALL)} hasIcon={true} iconPath={'/incoming.svg'} size={'medium'}/>
            </div>
        </div>
    )
}