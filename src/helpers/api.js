

export async function getAllTasksApi(signal) {
    const response = await fetch('http://localhost:3001/tasks', {signal: signal});
    return await response.json();
}

export async function addTaskApi(task) {
    const response = await fetch('http://localhost:3001/tasks',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)}
    )
    return await response.json();
}

export async function updateTaskApi(task){
    const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })

    return await response.json();
}

export async function deleteTaskApi(taskId) {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {method: 'DELETE'});
    return await response.json();
}

export async function changeStatusApi(taskId, status) {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status})
    })

    return await response.json();
}

export async function getTaskApi(id) {
    const response = await fetch(`http://localhost:3001/tasks/${id}`);
    return await response.json()
}