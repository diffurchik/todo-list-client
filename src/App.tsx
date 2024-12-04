import {useCallback, useState} from 'react'
import './App.css'


type Task = {
    title: string
    completed: boolean
}

function App() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<string>('')
    let timer: NodeJS.Timeout;

    const getAllTasks = useCallback(() => {
        let list: Task[] = []
        const fetchData = async () => {
            list = await fetch('http://localhost:3000/tasks')
                .then(res => res.json())
                .catch(err => console.error(err))
            setTasks(list)
        }
        fetchData().catch(err => console.error(err))
        console.log(tasks)
    }, [tasks])

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
        <>
            <div>Your todo-list!</div>
            <div>
                <input id='task-input' onChange={handleInput} onKeyDown={onKeyDown} placeholder={'Add new task'}
                       value={newTask}/>
            </div>
            <button onClick={getAllTasks} style={{margin: 16}}>Get all tasks</button>
            {tasks.length !== 0 && tasks.map((task: Task, index) => <div
                style={{margin: 20, backgroundColor: '#fffcf6', color: 'black', padding: 5, textAlign: 'left'}}>
                <input type={"checkbox"} id={`task_${index}`}/>
                <label htmlFor={`task_${index}`}>{task.title}</label>
            </div>)}

        </>
    )
}

export default App
