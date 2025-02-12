import {createContext, ReactNode, useContext, useState} from "react";
import * as React from "react";
import {Task} from "./types.ts";

type AppProviderProps = {
    children: ReactNode;
}

type AppContextProps = {
    image: string | null;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [image, setImage] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([])

    return <AppContext.Provider value={{image, setImage, tasks, setTasks}}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if(!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}