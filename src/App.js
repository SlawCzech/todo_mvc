import {useState} from "react";


function* genId() {
    let id = 0;
    while (true) {
        yield id;
        id++;
    }
}

const nextId = genId();


function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    function handleInput(event) {
        setValue(event.target.value)
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
        setTasks(tasks.filter((task) => task != taskToRemove));
    }

    function handleDeleteAllTask() {
        setTasks(tasks.filter((task) => !task.status));
    }

    function handleDoneAllTasks() {
        let done = tasks.every((task) => task.status === true);
        setTasks(tasks.map((task) => ({...task, status: !done})));
    }

    return (
        <div>
            <h1>todos</h1>
            <div>
                <button onClick={handleDoneAllTasks}>All done!</button>
                <input type="text" onKeyUp={handleAddTask} onChange={handleInput} value={value}
                       placeholder={'What needs to be done?'}/>
                <ul>
                    {tasks
                        .filter((task) => filter === 'all' ? true : task.status === filter)
                        .map((task) => <li key={task.id}>
                        <button onClick={() => {handleChangeStatus(task)}}>{`${task.status}`}</button>
                        <span>{task.name}</span>
                        <button onClick={() => handleDeleteTask(task)}>x</button>
                    </li>)}
                </ul>
                <span>{tasks.filter((task) => !task.status).length} items left</span>
                <div>
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter(false)}>Active</button>
                    <button onClick={() => setFilter(true)}>Completed</button>
                </div>

                {!!tasks.filter((task) => !task.status) && (<button onClick={handleDeleteAllTask}>Clear completed</button>)}

            </div>
        </div>
    );
}

export default App;
