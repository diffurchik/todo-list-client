import {TasksList} from "./task-components/TasksList.tsx";

export const WeekBoardComponent: React.FC = () => {
    return (
        <div style={{display: "flex", flexDirection: 'row',}}>
            <div>
                <div style={{height: "auto"}}>Today</div>
                <TasksList/>
            </div>
            <div>Tomorrow</div>
        </div>
    )
}