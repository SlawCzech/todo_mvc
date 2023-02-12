import "./InputWrapper";
import InputTask from "./InputTask";
import ToggleStatuses from "../ToggleStatuses/ToggleStatuses";

function InputWrapper({tasks, doneAll, handleAddTask, handleDoneAllTasks}) {
    return (
        <div className='inputWrapper'>
            {!!tasks.length && (
                <ToggleStatuses handleDoneAllTasks={handleDoneAllTasks} doneAll={doneAll}/>
            )}
            <InputTask
                       handleAddTask={handleAddTask} />
        </div>
    );
}

export default InputWrapper;