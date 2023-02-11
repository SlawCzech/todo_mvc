import React, {useState} from "react";
import Header from "./components/Header/Header";
import InputWrapper from "./components/InputWrapper/InputWrapper";
import Tasks from "./components/Tasks/Tasks";
import * as PropTypes from "prop-types";
import {TaskCounter} from "./components/TaskCounter/TaskCounter";
import {Filters} from "./components/Filters/Filters";
import {ClearCompleted} from "./components/ClearCompleted/ClearCompleted";


function* genId() {
    let id = 0;
    while (true) {
        yield id;
        id++;
    }
}

const nextId = genId();


TaskCounter.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.any),
    predicate: PropTypes.func
};

Filters.propTypes = {
    onClick: PropTypes.func,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func
};

ClearCompleted.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.any),
    predicate: PropTypes.func,
    onClick: PropTypes.func
};

function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [done, setDoneAll] = useState(false);

    function handleInput(event) {
        setValue(event.target.value)
    }

    function handleContentEditable(event, taskToChange){
        setTasks(tasks.map((task) => {
            if (task === taskToChange) {
                task.name = event.target.innerText;
            }
            return task
        }))
    }

    function handleAddTask(event) {
        if (event.key === 'Enter') {
            setTasks([...tasks, {
                id: nextId.next().value,
                name: value,
                status: false
            }]);
            setValue('');
        }
    }

    function handleChangeStatus(task) {
        task.status = !task.status;
        setTasks([...tasks]);
    }

    function handleDeleteTask(taskToRemove) {
        setTasks(tasks.filter((task) => task !== taskToRemove));
    }

    function handleDeleteAllTask() {
        setTasks(tasks.filter((task) => !task.status));
    }

    function handleDoneAllTasks() {
        let done = tasks.every((task) => task.status === true);
        setTasks(tasks.map((task) => ({...task, status: !done})));
        setDoneAll(!done);
    }

    return (
        <div>
            <Header/>
            <InputWrapper tasks={tasks} doneAll={done} handleDoneAllTasks={handleDoneAllTasks} value={value} handleAddTask={handleAddTask} handleInput={handleInput} />

            {!!tasks.length && (
                <div>
                    <Tasks handleContentEditable={handleContentEditable} tasks={tasks} filter={filter}
                           handleChangeStatus={handleChangeStatus} handleDeleteTask={handleDeleteTask}/>

                    <div>


                        <TaskCounter tasks={tasks} predicate={(task) => !task.status}/>
                        <Filters setFilter={{setFilter}}/>

                        <ClearCompleted tasks={tasks} predicate={(task) => task.status} onClick={handleDeleteAllTask}/>

                    </div>
                </div>
            )}




        </div>
    );
}

export default App;
