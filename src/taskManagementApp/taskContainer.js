import {useState, useEffect} from 'react'
import axios from 'axios'
import TaskList from './taskList'
import TaskForm from './taskForm'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function TaskContainer() {
    const [tasks,setTasks] = useState([])
    const url = 'http://localhost:3010/api/tasks'

    useEffect(() => {
        (async function() {
            try {
                const response = await axios.get(url)
                const result = response.data
                setTasks(result)
            } catch(err) {
                console.log(err)
            }
        })();
    }, [])

    const addTask = (obj) => {
        setTasks([...tasks, obj])
    }

    const deleteTask = (id) => {
        const arr = tasks.filter(ele => {
            return ele._id !== id
        })
        setTasks(arr)
    }

    const editTask = (obj) => {
        const arr = tasks.map(ele => {
            return ele._id === obj._id ? obj : ele 
        })
        //console.log(arr)
        setTasks(arr)
    }

    return (
        <div className='container'>
            <h1 className='text-center'>Task Management App</h1><br/>
            <TaskList 
                tasks={tasks}
                deleteTask={deleteTask}
                url={url}
                editTask={editTask}
            /><br/>
            <TaskForm
                addTask={addTask}
            />
        </div>
    )
}