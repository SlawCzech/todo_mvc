import React, {useState} from "react";
import './InputWrapper.scss'

function InputTask({handleAddTask}) {
    const [value, setValue] = useState('');
    function handleInput(event) {
        setValue(event.target.value)
    }

    function addTask(event){
        if (event.key === 'Enter' && value.trim() !== ''){
        handleAddTask(value);
        setValue('');}
    }

    return (
        <input type="text"
               className='inputTask'
               onKeyUp={addTask}
               onChange={handleInput}
               value={value}
               placeholder={'What needs to be done?'}/>
    );
}

export default InputTask;