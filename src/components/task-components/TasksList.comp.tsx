import { FC } from "react";
import { Task } from "../../domain/Task.ts";
import { TaskComponent } from "./Task.comp.tsx";

type Props = {
  tasks: Task[]
}
export const TasksList: FC<Props> = ({ tasks }) => {
  return (
    <div>
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