import {createContext, ReactNode, useContext, useState} from "react";
import * as React from "react";
import {Task} from "./Task.ts";
import { TasksFilter } from "./components/types.ts";
type AppProviderProps = {
    children: ReactNode;
}

type AppContextProps = {
    image: string | null;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    tasksFilter: TasksFilter;
    setTasksFilter: React.Dispatch<React.SetStateAction<TasksFilter>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [image, setImage] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([])
    const [tasksFilter, setTasksFilter] = useState<TasksFilter>(TasksFilter.ALL)

    return <AppContext.Provider value={{image, setImage, tasks, setTasks, tasksFilter, setTasksFilter}}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if(!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}