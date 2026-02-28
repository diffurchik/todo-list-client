import {FC} from "react";
import {Task} from "../../Task.ts";
import {TaskComponent} from "./TaskComponent.tsx";  
    
type Props = {
    listTitle: string
    tasks: Task[] 
}
export const TasksList: FC<Props> = ({tasks, listTitle}) => {    
      return (
        <div style={{ marginTop: 40 }}>
          <div
            style={{
              fontSize: 24,
              marginBottom: 30,
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {listTitle}
          </div>
      
          {tasks.length !== 0 ? (
            tasks.map((task: Task, index: number) => (
              <TaskComponent key={task.id} task={task} index={index} />
            ))
          ) : (
            <p>You don't have incomplete tasks for this filter</p>
          )}
        </div>
      );
}