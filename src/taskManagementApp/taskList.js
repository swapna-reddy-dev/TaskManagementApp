import TaskItem from "./taskItem"


export default function TaskList(props) {

    return (
        <div className="container custom-container">
            {!props.tasks.length ? <p>No tasks found! Add a new task</p> : (
                <div>
                    <h2>Listing Task - {props.tasks.length}</h2>
                    <ul className="list-group">
                        {props.tasks.map(ele => {
                            return <TaskItem 
                                        key={ele._id}
                                        task={ele}
                                        deleteTask={props.deleteTask}
                                        url={props.url} 
                                        editTask={props.editTask}
                                    />
                        })}
                    </ul><br/>
                    
                </div>
            )}
        </div>
    )
}
//import TaskItem from './taskItem'
// //import TaskForm from './taskForm'
// import {useState, useEffect} from 'react'
// import axios from 'axios'

// function TaskList() {
//     const [tasks, setTasks] = useState([])
//     const [title,setTitle] = useState('')
//     const [description, setDescription] = useState('')
//     const [status, setStatus] = useState('Pending')
//     const [priority, setPriority] = useState('Low')
//     const [isVisible,setIsVisible] = useState(false)
//     const [taskDetails, setTaskDetails] = useState([])
//     const url = 'http://localhost:3010/api/tasks'

//     // const handleSetTasks = (result) => {
//     //     setTasks(result)
//     // }
    
//     useEffect(() => {
//         axios.get(url)
//             .then((response) => {
//                 const result = response.data
//                 setTasks(result)
//             })
//     },[])

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const task = {
//             title,
//             description,
//             status,
//             priority
//         }
//         axios.post(url, task)
//             .then(response => {
//                 const result = response.data
//                 setTasks([...tasks, result])
//                 setTitle('')
//                 setDescription('')
//                 setStatus('')
//                 setPriority('')
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     const handleDelete = (obj) => {
//         const confirmation = window.confirm('Are You Sure You Want To Delete '+obj.title)
//         if(confirmation) {
//             axios.delete(`${url}/${obj._id}`)
//                 .then((response) => {
//                     const newArr = tasks.filter(ele => {
//                         return ele._id !== response.data._id
//                     })
//                     setTasks(newArr)
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         }
//     }

//     const handleEdit = (obj) => {
//         setTitle(obj.title)
//         setDescription(obj.description)
//         setStatus(obj.status)
//         setPriority(obj.priority)
//         const updatedTask = {
//             title,
//             description,
//             status,
//             priority
//         }
//         console.log(title,description,status,priority)
//         axios.put(`${url}/${obj._id}`,updatedTask)
//             .then((response) => {
//                 const newArr = tasks.map(ele => {
//                     return ele._id === response.data._id ? response.data : ele
//                 })
//                 setTasks(newArr)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     const handleShowMore = (obj) => {
//         axios.get(`${url}/${obj._id}`)
//             .then((response) => {
//                 const result = response.data
//                 const {title, description, status, priority} = result
//                 //setTaskDetails([...taskDetails, result.title,result.description,result.status,result.priority])
//                 setTaskDetails(Object.entries({title, description, status, priority}))
                
//                 setIsVisible(true)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }
    

//     return (
//         <div>
//             {!tasks.length ? <p>No Tasks Found</p> : (
//                 <div>
//                     <h2>Listing Tasks - {tasks.length}</h2>
//                     <ul>
//                         {tasks.map((task) => {
//                             return <li key={task._id}>{task.title}
//                                 <button onClick={() => {handleShowMore(task)}}>Show More</button>
//                                 <button onClick={() => {handleEdit(task)}}>Edit</button>
//                                 <button onClick={() => {handleDelete(task)}}>Delete</button></li>
//         }                  )}
//                     </ul>
//                 </div>
//             )}
//             {isVisible ? <div>
//                             <h2>Task Item</h2>
//                             <p>{taskDetails.map(([key, value],i) => {
//                             return  (<span key={i}>
//                                 <strong>{key} : </strong>{value}<br/>
//                             </span>)
//                         })}</p></div> : []}
//             {/* <TaskItem/> */}
//             {/* <TaskForm tasks={tasks} handleSetTasks={handleSetTasks} /> */}
//             <h2>Add Tasks</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Enter Title:</label><br/>
//                 <input type="text"
//                         value={title}
//                         onChange={(e) => {setTitle(e.target.value)}}
//                     /><br/><br/>
//                 <label>Enter Description:</label><br/>
//                 <textarea 
//                     value={description}
//                     onChange={(e) => {setDescription(e.target.value)}}
//                 ></textarea><br/><br/>
//                 <label>Select Status:</label><br/>
//                 <label><input type="radio"
//                         value='Pending'
//                         checked={status === 'Pending'}
//                         onChange={(e) => {setStatus(e.target.value)}}
//                 />Pending</label><br/>
//                 <label><input type="radio"
//                         value='In Progress'
//                         checked={status === 'In Progress'}
//                         onChange={(e) => {setStatus(e.target.value)}}
//                 />In Progress</label><br/>
//                 <label><input type="radio"
//                         value='Completed'
//                         checked={status === 'Completed'}
//                         onChange={(e) => {setStatus(e.target.value)}}
//                 />Completed</label>
//                 <br/><br/>
//                 <label>Select Priority:</label><br/>
//                 <label><input type="radio"
//                         value='Low'
//                         checked={priority === 'Low'}
//                         onChange={(e) => {setPriority(e.target.value)}}
//                 />Low</label><br/>
//                 <label><input type="radio"
//                         value='Medium'
//                         checked={priority === 'Medium'}
//                         onChange={(e) => {setPriority(e.target.value)}}
//                 />Medium</label><br/>
//                 <label><input type="radio"
//                         value='High'
//                         checked={priority === 'High'}
//                         onChange={(e) => {setPriority(e.target.value)}}
//                 />High</label>
//                 <br/><br/>
//                 <input type="submit"/>
//             </form>

//         </div>
//     )
// }

// export default TaskList