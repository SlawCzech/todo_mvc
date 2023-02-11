import React from "react";
import './InputWrapper.scss'

function InputTask({value, handleInput, handleAddTask}) {
    return (
        <input type="text"
               className='inputTask'
               onKeyUp={handleAddTask}
               onChange={handleInput}
               value={value}
               placeholder={'What needs to be done?'}/>
    );
}

export default InputTask;