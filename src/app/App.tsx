import { DayFilterComponent } from '../components/layout/DayFilterComponent.tsx';
import { NewTask } from '../components/layout/NewTask.tsx';
import { TasksListContainer } from '../components/task-components/TasksListContainer.comp.tsx';
import './App.css'
import { AppProvider } from './appContext.tsx';
import styles from '../styles.module.css'

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
