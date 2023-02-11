import './Task.scss'

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
            <span className='taskName' contentEditable onBlur={(event) => handleContentEditable(event, task)}>{name}</span>
            <button className='taskDeleteBtn' onClick={() => handleDeleteTask(task)}>x</button>
        </li>
    );
}

export default Task;