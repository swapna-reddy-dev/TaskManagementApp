import axios from "axios"
import { useState } from "react"
import { Modal, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function TaskItem(props) {
    const [taskDetails, setTaskDetails] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

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

    const handleEdit = async () => {
        const { value: newStatus } = await Swal.fire({
            title: `Update the status of ${props.task.title}`,
            input: 'text',
            inputLabel: 'New status',
            inputPlaceholder: 'Enter new status',
            showCancelButton: true, 
          });
          try {
            if (newStatus.trim()) {
                const formData = {
                            status: newStatus
                        }
                        try {
                            const response = await axios.put(`${props.url}/${props.task._id}`, formData)
                            const result = response.data
                                props.editTask(result)
                                //props.showTaskDetails(result)
                                Swal.fire({
                                    title: "Updated!",
                                    text: `Your task ${result.title}'s status has been successfully updated`,
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
              } else {
                Swal.fire('Cancelled', 'No status provided', 'error');
              }
          } catch(err) {
          }
    }

    const handleShowMore = async () => {
        setShow(true)
        try {
            const response = await axios.get(`${props.url}/${props.task._id}`)
            const result = response.data
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
            <button onClick={handleEdit} className="btn btn-primary btn-sm mr-2">Edit</button>
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
        </li>
        
    )
}


