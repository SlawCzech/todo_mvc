import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import InputWrapper from "./components/InputWrapper/InputWrapper";
import Tasks from "./components/Tasks/Tasks";
import * as PropTypes from "prop-types";
import {TaskCounter} from "./components/TaskCounter/TaskCounter";
import {Filters} from "./components/Filters/Filters";
import {ClearCompleted} from "./components/ClearCompleted/ClearCompleted";
import {addTaskApi, changeStatusApi, deleteTaskApi, getAllTasksApi} from "./helpers/api";
//
//
// function* genId() {
//     let id = 0;
//     while (true) {
//         yield id;
//         id++;
//     }
// }
//
// const nextId = genId();
//
//
// TaskCounter.propTypes = {
//     tasks: PropTypes.arrayOf(PropTypes.any),
//     predicate: PropTypes.func
// };
//
// Filters.propTypes = {
//     onClick: PropTypes.func,
//     onClick1: PropTypes.func,
//     onClick2: PropTypes.func
// };
//
// ClearCompleted.propTypes = {
//     tasks: PropTypes.arrayOf(PropTypes.any),
//     predicate: PropTypes.func,
//     onClick: PropTypes.func
// };

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    // const [done, setDoneAll] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        getAllTasksApi(controller.signal).then(setTasks);

        return () => {
            controller.abort();
        }
    }, [])


    function handleContentEditable(event, taskToChange) {
        setTasks(tasks.map((task) => {
            if (task === taskToChange) {
                task.name = event.target.innerText;
            }
            return task
        }))
    }

    async function handleAddTask(value) {
        const task = await addTaskApi({name: value, status: false, createdAt: new Date()})
        setTasks([...tasks, task]);

    }


    async function handleChangeStatus(task) {
        task.status = !task.status;
        await changeStatusApi(task.id, task.status);
        setTasks([...tasks]);
    }

    async function handleDeleteTask(taskToRemove) {
        await deleteTaskApi(taskToRemove.id);
        setTasks(tasks.filter((task) => task !== taskToRemove));
    }

    async function handleDeleteAllTask() {
        const filteredTasks = [];
        for (const task of tasks) {
            if (task.status) {
                await deleteTaskApi(task.id)
            } else {
                filteredTasks.push(task)
            }
        }
        setTasks(filteredTasks);
    }

    async function handleDoneAllTasks() {
        let done = tasks.every((task) => task.status === true);
        const mappedTask = [];
        for (const task of tasks){
            mappedTask.push({...task, status: !done});
            await changeStatusApi(task.id, !done);
        }
        setTasks(mappedTask);
        // setDoneAll(!done);
    }

    return (
        <div>
            <Header/>
            <InputWrapper tasks={tasks}
                          handleDoneAllTasks={handleDoneAllTasks}
                          handleAddTask={handleAddTask}/>

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
