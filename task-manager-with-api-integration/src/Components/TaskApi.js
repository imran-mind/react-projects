import { SERVER_URL } from "../config"

export const CreateTask = async (task) => {
    try {
        const url = `${SERVER_URL}/tasks`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // You can add other headers here if needed
            },
            body: JSON.stringify(task),
        }
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
    } catch (err) {
        console.log('Error');
    }
}

export const UpdateTask = async (task) => {
    console.log('--task -', task);
    try {
        const url = `${SERVER_URL}/tasks/${task?._id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // You can add other headers here if needed
            },
            body: JSON.stringify(task),
        }
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
    } catch (err) {
        console.log('Error');
    }
}

export const DeleteTask = async (_id) => {
    console.log('--task -', _id);
    try {
        const url = `${SERVER_URL}/tasks/${_id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // You can add other headers here if needed
            },
            // body: JSON.stringify(task),
        }
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
    } catch (err) {
        console.log('Error');
    }
}

export const FetchTasks = async () => {
    const url = `${SERVER_URL}/tasks`;
    try {
        const result = await fetch(url);
        const tasks = await result.json();
        if (result.status === 200) {
            return tasks?.data;
        }
        return [];
    } catch (err) {
        console.error('Error while fetching tasks: ', err);
    }
}