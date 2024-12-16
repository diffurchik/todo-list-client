import {useCallback, useState} from 'react'
import './App.css'
import {AppProvider} from "./components/appContext.tsx";
import {Cover} from "./components/Cover.tsx";
import styles from "./styles.module.css"
import {TasksList} from "./components/TasksList.tsx";

function App() {

    const [newTask, setNewTask] = useState<string>('')
    let timer: NodeJS.Timeout;

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => setNewTask(title), 30)
    }, [newTask])

    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const sendData = async () => {
                await fetch('http://localhost:3000/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type
                    },
                    body: JSON.stringify({title: newTask}),
                }).then(res => res.json()).catch(err => console.error(err))
            }
            sendData().catch(err => console.error(err))
            setNewTask('')
        }
    }, [newTask])

    return (
        <AppProvider>
            <Cover/>
            <div className={styles.header}>todo-list</div>
            <hr />
            <div className={styles.todolist_container}>
                <div className={styles.todolist}>
                    <TasksList/>
                    <input id='task-input' onChange={handleInput} onKeyDown={onKeyDown} placeholder={'Add new task'}
                           value={newTask} style={{marginLeft: 4}} className={styles.todo_input}/>
                </div>
            </div>
        </AppProvider>
    )
}

export default App
