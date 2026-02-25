import {ButtonComponent} from "./atom-components/ButtonComponent.tsx";
import { useAppContext } from "../appContext.tsx";
import { useCallback } from "react";
import { TasksFilter } from "./types.ts";
import { TasksWorker } from "./TasksWorker.ts";
import { Task } from "../Task.ts";

export const DayFilterComponent: React.FC = () => { 

    const {setFilter, allTasks, setFilteredTasks } = useAppContext()

    const handleFilterClick = useCallback(async (filter: TasksFilter) => { 
        setFilter(filter)
        const tasksWorker = new TasksWorker()
        let data = new Date()
        switch (filter) {
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
        const filteredTasks = await tasksWorker.getTaskByDate(data, allTasks)
        setFilteredTasks(filteredTasks as Task[])
    }, [setFilter, allTasks, setFilteredTasks])

    const handleIncomingClick = useCallback(async () => {
        setFilter(TasksFilter.ALL)
        setFilteredTasks(allTasks)
    }, [allTasks, setFilteredTasks, setFilter])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'absolute', top: '20vh'}}>
            <div style={{marginBottom:20}}>
                <ButtonComponent title={'Incoming'} onClick={handleIncomingClick} hasIcon={true} iconPath={'/incoming.svg'} size={'medium'}/>
            </div>
            <ButtonComponent title={'Today'} onClick={() => handleFilterClick(TasksFilter.TODAY)} hasIcon={true} iconPath={'/today.svg'} size={'medium'}/>
            <ButtonComponent title={'Tomorrow'} onClick={() => handleFilterClick(TasksFilter.TOMORROW)} hasIcon={true} iconPath={'/tomorrow.svg'} size={'medium'}/>
            <div style={{marginTop:60}}>
                <ButtonComponent title={'Weekend'} onClick={() => handleFilterClick(TasksFilter.WEEKEND)} hasIcon={true} iconPath={'/weekend.svg'} size={'medium'}/>
            </div>
        </div>
    )
}