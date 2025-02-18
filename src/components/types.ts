export type Task = {
  id: number;
  title: string;
  checked?: boolean;
  priority?: number;
  description?: string;
  dueDate?: string | Date;
  repeated?: boolean;
};

export type TaskDTO = {
  id: number;
  title: string;
  checked?: boolean;
  priority?: number;
  description?: string;
  due_date: string;
  repeated?: boolean;
};

export enum TasksFilter {
    ALL = 'all',
    TODAY = 'today',
    TOMORROW = 'tomorrow',
    WEEKEND = 'weekend',
}
