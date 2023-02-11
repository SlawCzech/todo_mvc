import Task from "./Task";
import './Tasks.scss'

function Tasks({handleContentEditable, tasks, filter, handleDeleteTask, handleChangeStatus}) {
    return (
        <ul className='tasks'>

            {tasks
                .filter((task) => filter === 'all' ? true : task.status === filter)
                .map((task) =>
                    <Task
                    key={task.id}
                    handleDeleteTask={handleDeleteTask}
                    handleChangeStatus={handleChangeStatus}
                    task={task}
                    handleContentEditable={handleContentEditable}
                />)}
        </ul>
    );
}

export default Tasks;