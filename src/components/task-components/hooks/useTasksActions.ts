import { useCallback } from "react";
import { TaskData } from "../../types";
import { useAppContext } from "../../../app/appContext";
import { Task } from "../../../domain/Task";

export const useTasksActions = () => {
    const { setAllTasks } = useAppContext();
  
    const updateTask = useCallback((taskId: TaskData["id"], updater: (t: TaskData) => void) => {
        setAllTasks(prev => prev.map(i => {
            if (i.id === taskId) {
                updater(i)
            }
            return i
        }
        ))
    }, [setAllTasks]);
  
    const bulkUpdateTasks = useCallback((
    predicate: (t: Task) => boolean,
      updater: (t: Task) => void
    ) => {
        setAllTasks(prev =>
            prev.map(t => {
              if (predicate(t)) {
                updater(t);
              }
              return t;
            })
          )
    }, [setAllTasks]);
  
    const deleteTask = useCallback((taskId: TaskData["id"]) => {
      setAllTasks(prev => prev.filter(t => t.id !== taskId))
    }, [setAllTasks])

    return { updateTask, bulkUpdateTasks, deleteTask };

  };