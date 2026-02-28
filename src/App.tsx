import './App.css'
import {AppProvider} from "./appContext.tsx";
import styles from "./styles.module.css"
import {NewTask} from "./components/NewTask.tsx";
import {DayFilterComponent} from "./components/DayFilterComponent.tsx";
import { TasksListContainer } from './components/task-components/TasksListContainer.tsx';

function App() {

    return (
        <AppProvider>
            {/*<Cover/>*/}
            <div className={styles.header}>todo-list</div>
            <hr/>
            <div className={styles.todolist_container}>
                <div className={styles.day_filter}>
                    <DayFilterComponent/>
                </div>
                <div className={styles.todolist}>
                    {/*<WeekBoardComponent />*/}
                    <TasksListContainer/>
                    <NewTask/>
                </div>
            </div>

        </AppProvider>
    )
}

export default App
