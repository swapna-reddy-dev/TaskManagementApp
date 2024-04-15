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
