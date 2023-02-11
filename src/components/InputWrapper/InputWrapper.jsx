import "./InputWrapper";
import InputTask from "./InputTask";
import ToggleStatuses from "../ToggleStatuses/ToggleStatuses";

function InputWrapper({tasks, doneAll, value, handleInput, handleAddTask, handleDoneAllTasks}) {
    return (
        <div className='inputWrapper'>
            {!!tasks.length && (
                <ToggleStatuses handleDoneAllTasks={handleDoneAllTasks} doneAll={doneAll}/>
            )}
            <InputTask value={value}
                       handleInput={handleInput}
                       handleAddTask={handleAddTask} />
        </div>
    );
}

export default InputWrapper;