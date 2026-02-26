import {ButtonComponent} from "./atom-components/ButtonComponent.tsx";
import { useAppContext } from "../appContext.tsx";
import { useCallback } from "react";
import { TasksFilter } from "./types.ts";

export const DayFilterComponent: React.FC = () => { 

    const {setFilter} = useAppContext()

    const handleFilterClick = useCallback(
        (filter: TasksFilter) => {
          setFilter(filter);
        },
        [setFilter]
      );
    
      const handleIncomingClick = useCallback(() => {
        setFilter(TasksFilter.ALL);
      }, [setFilter]);

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