import {FC, useEffect, useMemo} from "react";
import {useAppContext} from "../../appContext.tsx";
import {Task} from "../../Task.ts";
import {TaskComponent} from "./TaskComponent.tsx";
import { TasksWorker } from "../TasksWorker.ts";    
import { TasksFilter } from "../types.ts";
    
export const TasksList: FC = () => {

    const {setAllTasks, filter, allTasks } = useAppContext()

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

    const getDateForFilter = (filter: TasksFilter): Date | null => {
        const today = new Date();
      
        switch (filter) {
          case TasksFilter.TODAY:
            return today;
          case TasksFilter.TOMORROW:
            return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
          case TasksFilter.WEEKEND: {
            const temp = new Date(today);
            const saturdayOffset = 6 - temp.getDay();
            return new Date(
              temp.getFullYear(),
              temp.getMonth(),
              temp.getDate() + saturdayOffset
            );
          }
          default:
            return null;
        }
      };
      
      const isSameDay = (a: Date, b: Date): boolean =>
        a.toDateString() === b.toDateString();
      
      const filterTasksByDate = (tasks: Task[], date: Date | null): Task[] => {
        if (!date) return tasks;
      
        return tasks.filter((task) => {
          if (!task.dueDate) return false;
      
          const taskDate =
            task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);
      
          return isSameDay(taskDate, date);
        });
      };
      
      const visibleTasks = useMemo(() => {
        if (filter === TasksFilter.ALL) return allTasks;
        const date = getDateForFilter(filter);
        return filterTasksByDate(allTasks, date);
      }, [allTasks, filter]);      

      return (
        <div style={{ marginTop: 40 }}>
          <div
            style={{
              fontSize: 24,
              marginBottom: 50,
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {filter === TasksFilter.ALL && <div>All incoming tasks </div>}
            {filter === TasksFilter.TODAY && <div>Today</div>}
            {filter === TasksFilter.TOMORROW && <div>Tomorrow</div>}
            {filter === TasksFilter.WEEKEND && <div>Weekend</div>}
          </div>
      
          {visibleTasks.length !== 0 ? (
            visibleTasks.map((task: Task, index: number) => (
              <TaskComponent key={task.id} task={task} index={index} />
            ))
          ) : (
            <p>You don't have incomplete tasks for this filter</p>
          )}
        </div>
      );
}