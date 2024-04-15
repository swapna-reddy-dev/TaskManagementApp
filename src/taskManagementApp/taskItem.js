import axios from "axios"
import { useState } from "react"
import { Modal, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function TaskItem(props) {
    const [taskDetails, setTaskDetails] = useState([])
    

    const [formData, setFormData] = useState({
        title: props.task.title,
        description: props.task.description,
        status: props.task.status,
        priority: props.task.priority
    })

    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleEditClose = () => setEditShow(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name] : value})
    }

    const handleDelete = () => {
        Swal.fire({
            title: `Are you sure you want to delete ${props.task.title}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                (async function() {
                    try {
                        const response = await axios.delete(`${props.url}/${props.task._id}`)
                        const result = response.data
                        props.deleteTask(result._id)
                        Swal.fire({
                            title: "Deleted!",
                            text: `Your task ${result.title} has been deleted.`,
                            icon: "success"
                        });
                    } catch(err) {
                        console.log(err)
                        Swal.fire({
                            title: "Oops!",
                            text: `${err.message}`,
                            icon: "error"
                        });
                    }
                })()
            }
          });
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            try {
                const response = await axios.put(`${props.url}/${props.task._id}`, formData)
                const result = response.data
                props.editTask(result)
                Swal.fire({
                    title: "Updated!",
                    text: `Your task ${result.title}'s status has been successfully updated`,
                    icon: "success"
                });
                setEditShow(false)
            } catch(err) {
                console.log(err)
                    Swal.fire({
                        title: "Oops!",
                        text: `${err.message}`,
                        icon: "error"
                    });
            }
        } catch(err) {
            console.log(err)
        }


    }

    const handleShowMore = async () => {
        setShow(true)
        try {
            const response = await axios.get(`${props.url}/${props.task._id}`)
            const result = response.data
            console.log(result)
                const {title, description, status, priority} = result
                //setTask(title)
                setTaskDetails(Object.entries({title, description, status, priority}))
                //setIsVisible(true)
        } catch(err) {
            console.log(err)
        }

    }

    return (
        <li className="list-group-item" key={props.task._id}><span>{props.task.title}</span>
        <div>
            <button onClick={()=>{setEditShow(true)}} className="btn btn-primary btn-sm mr-2">Edit</button>
            <button onClick={handleDelete} className="btn btn-danger btn-sm mr-2">Delete</button>
            <Button onClick={handleShowMore} variant="info" size="sm">Show Details</Button></div>
            
       
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.task.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <p>{taskDetails.map(([key, value],i) => {
                            return  (<span key={i}>
                                    <strong>{key[0].toUpperCase() + key.slice(1).toLowerCase()} : </strong>{value}<br/>
                                    </span>)
                        })}</p></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*edit */}
            <Modal show={editShow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit the {props.task.title} task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="container custom-container" onSubmit={handleEdit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Title</label>
                <input type="text"
                        className="form-control custom-form-control"
                        id="name"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Enter Description:</label>
                    <textarea 
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Select Status:</label>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='Pending'
                                id="Pending"
                                name="status"
                                checked={formData.status === 'Pending'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="Pending">Pending</label>
                        </div>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='In Progress'
                                id="In Progress"
                                name="status"
                                checked={formData.status === 'In Progress'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="In Progress">In Progress</label>
                        </div>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='Completed'
                                id="Completed"
                                name="status"
                                checked={formData.status === 'Completed'}
                                onChange={handleChange}
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
                                name="priority"
                                checked={formData.priority === 'Low'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="Low">Low</label>
                        </div>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='Medium'
                                id="Medium"
                                name="priority"
                                checked={formData.priority === 'Medium'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="Medium">Medium</label>
                        </div>
                        <div className="form-check">
                            <input type="radio"
                                className="form-check-input"
                                value='High'
                                id="High"
                                name="priority"
                                checked={formData.priority === 'High'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="High">High</label>
                        </div>
                </div>
                <div className="mb-3">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        
                </Modal.Body>
            </Modal>
        </li>
        
    )
}


