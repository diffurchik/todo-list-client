import { useMemo } from "react";
import { Task } from "../../../Task";
import { TasksFilter } from "../../types";

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
  if (!date) {return tasks};

  return tasks.filter((task) => {
    if (!task.dueDate) {return false};

    const taskDate =
      task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);

    return isSameDay(taskDate, date);
  });
};

export const useFilteredTasks = (tasks: Task[], filter: TasksFilter) => {
  return useMemo(() => {
    if (filter === TasksFilter.ALL) {return tasks};
    const date = getDateForFilter(filter);
    return filterTasksByDate(tasks, date);
  }, [tasks, filter]);
};