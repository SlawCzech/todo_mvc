import "./InputWrapper";
import InputTask from "./InputTask";
import ToggleStatuses from "../ToggleStatuses/ToggleStatuses";

function InputWrapper({tasks, handleAddTask, handleDoneAllTasks}) {
    return (
        <div className='inputWrapper'>
            {!!tasks.length && (
                <ToggleStatuses handleDoneAllTasks={handleDoneAllTasks} tasks={tasks}/>
            )}
            <InputTask
                       handleAddTask={handleAddTask} />
        </div>
    );
}

export default InputWrapper;