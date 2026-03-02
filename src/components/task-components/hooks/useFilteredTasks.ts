// useFilteredTasks.ts
import { useMemo } from "react";
import { TasksFilter } from "../../types";
import { Task } from "../../../domain/Task";

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

export const useFilteredTasks = (
  tasks: Task[],
  filter: TasksFilter
): { overdueTasks: Task[]; filteredTasks: Task[] } => {
  return useMemo(() => {
    const overdueTasks: Task[] = [];
    const filteredTasks: Task[] = [];

    const date = filter === TasksFilter.ALL ? null : getDateForFilter(filter);

    for (const task of tasks) {
      if (!task.dueDate) { continue };

      if (task.isTaskOverdue()) {
        overdueTasks.push(task);
        continue;
      }

      if (!date) {
        filteredTasks.push(task);
      } else {
        const taskDate =
          task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);

        if (isSameDay(taskDate, date)) {
          filteredTasks.push(task);
        }
      }
    }

    return { overdueTasks, filteredTasks };
  }, [tasks, filter]);
};