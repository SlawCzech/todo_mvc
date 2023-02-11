import './ToggleStatuses.scss';

function ToggleStatuses({handleDoneAllTasks, doneAll}) {
    return (
            <i
                className={doneAll ? 'toggleStatuses done' : 'toggleStatuses'}
                onClick={handleDoneAllTasks}
            >
            </i>
    );
}

export default ToggleStatuses;