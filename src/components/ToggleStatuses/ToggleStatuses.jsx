import './ToggleStatuses.scss';

function ToggleStatuses({handleDoneAllTasks, tasks}) {
    return (
            <i
                className={tasks.every((task) => task.status ===true) ? 'toggleStatuses done' : 'toggleStatuses'}
                onClick={handleDoneAllTasks}
            >
            </i>
    );
}

export default ToggleStatuses;