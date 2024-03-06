import axios from "axios"
import { useState } from "react"
import './cssForTaskForm.css'
import Swal from 'sweetalert2'

export default function TaskForm(props) {
    const [title,setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('Pending')
    const [priority, setPriority] = useState('Low')
    const url = 'http://localhost:3010/api/tasks'

    const handleSubmit = async (e) => {
        e.preventDefault()
        const task = {
            title,
            description,
            status,
            priority
        }
        try {
            const response = await axios.post(url, task)
            const result = response.data
                props.addTask(result)
                setTitle('')
                setDescription('')
                setStatus('Pending')
                setPriority('Low')
                Swal.fire({
                    icon: "success",
                    text: "Task has been saved successfully!",
                  });
        } catch (err) {
            console.log(err)
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: `${err.message}`,
                  });
        }
       
    }
    

    return (
        <form className="container custom-container" onSubmit={handleSubmit}>
                <h2 className="text-center border-bottom border-primary">Add Tasks</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Title</label>
                <input type="text"
                        className="form-control custom-form-control"
                        id="name"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Enter Description:</label>
                    <textarea 
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Select Status:</label>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='Pending'
                                id="Pending"
                                checked={status === 'Pending'}
                                onChange={(e) => {setStatus(e.target.value)}}
                            />
                            <label className="form-check-label" htmlFor="Pending">Pending</label>
                        </div>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='In Progress'
                                id="In Progress"
                                checked={status === 'In Progress'}
                                onChange={(e) => {setStatus(e.target.value)}}
                            />
                            <label className="form-check-label" htmlFor="In Progress">In Progress</label>
                        </div>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='Completed'
                                id="Completed"
                                checked={status === 'Completed'}
                                onChange={(e) => {setStatus(e.target.value)}}
                            />
                            <label className="form-check-label" htmlFor="Completed">Completed</label>
                        </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Select Priority:</label>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='Low'
                                id="Low"
                                checked={priority === 'Low'}
                                onChange={(e) => {setPriority(e.target.value)}}
                            />
                            <label className="form-check-label" htmlFor="Low">Low</label>
                        </div>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='Medium'
                                id="Medium"
                                checked={priority === 'Medium'}
                                onChange={(e) => {setPriority(e.target.value)}}
                            />
                            <label className="form-check-label" htmlFor="Medium">Medium</label>
                        </div>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='High'
                                id="High"
                                checked={priority === 'High'}
                                onChange={(e) => {setPriority(e.target.value)}}
                            />
                            <label className="form-check-label" htmlFor="High">High</label>
                        </div>
                </div>
                <div className="mb-3">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        
    )
}

