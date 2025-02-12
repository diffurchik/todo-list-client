import './App.css'
import {AppProvider} from "./components/appContext.tsx";
import {Cover} from "./components/Cover.tsx";
import styles from "./styles.module.css"
import {TasksList} from "./components/TasksList.tsx";
import {NewTask} from "./components/NewTask.tsx";

function App() {

    return (
        <AppProvider>
            <Cover/>
            <div className={styles.header}>todo-list</div>
            <hr />
            <div className={styles.todolist_container}>
                <div className={styles.todolist}>
                    <TasksList/>
                    <NewTask/>
                </div>
            </div>
        </AppProvider>
    )
}

export default App
