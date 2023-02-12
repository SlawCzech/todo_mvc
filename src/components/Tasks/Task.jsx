import './Task.scss'
import {Link} from "react-router-dom";

function Task({handleContentEditable, task, handleDeleteTask, handleChangeStatus}) {
    const {id, status, name} = task;

    return (
        <li key={id} className={status ? 'task done' : 'task'}>
            <i
                className='taskStatus'
                onClick={() => {
                handleChangeStatus(task)
            }}
            >
            </i>
            <span className='taskName' onBlur={(event) => handleContentEditable(event, task)}
            >
                <Link to={`/details/${id}`}>{name}</Link>
            </span>
            <button className='taskDeleteBtn' onClick={() => handleDeleteTask(task)}>x</button>
        </li>
    );
}

export default Task;