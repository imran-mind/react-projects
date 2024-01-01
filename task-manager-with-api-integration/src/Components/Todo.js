
import React, { useEffect, useRef, useState } from 'react';
import './Todo.css';
import { TextField } from '@mui/material';
import TodoList from './TodoList';
import CustomLoader from './CustomLoader';
import CustomAlert from './CustomAlert';
import { CreateTask, DeleteTask, FetchTasks, UpdateTask } from './TaskApi';

const Todo = () => {
    const [todo, setTodo] = useState({ name: '' });
    const [todos, setTodos] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isSaving, setSaving] = useState(false);
    const [severity, setSeverity] = useState(false);
    const isInputValid = todo?.name?.length >= 3;

    const handleChange = (e) => {
        if (isEditMode) {
            setTodo({
                _id: todo?._id,
                name: e.target.value,
                isCompleted: todo?.isCompleted
            });
        } else {
            setTodo({ name: e.target.value });
        }
    }

    const handleEditMode = (item) => {
        setIsEditMode(true);
        setTodo(item);
    }

    const loadTodos = async () => {
        const tasks = await FetchTasks();
        setTodos(tasks);
        setSaving(false)
    }

    const setSeverityMessage = (result) => {
        let msg = `Task ${isEditMode ? 'Updated' : 'Created'} Successfully!`;
        if (result.status >= 400) {
            msg = result.message;
            setSeverity('error');
        } else {
            setSeverity('success');
        }
        setAlertMessage(msg);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (todo && !isEditMode && isInputValid) { //Create Mode
            setSaving(true)
            const result = await CreateTask(todo);
            console.log(typeof result.status);
            setSeverityMessage(result);
            await loadTodos();
        } else if (todo && isEditMode && isInputValid) { //Edit Mode
            setSaving(true)
            console.log(todo);
            const result = await UpdateTask(todo);
            setSeverityMessage(result);
            await loadTodos();
            setIsEditMode(false);
        }
        setTodo({ _id: 0, name: '', isCompleted: false });
        if (isInputValid) {
            setSnackbarOpen(true);
        }
    }

    const handleRowClick = async (clickedItem) => {
        setSaving(true)
        clickedItem.isCompleted = !clickedItem.isCompleted;
        await UpdateTask(clickedItem);
        await loadTodos();
        setIsEditMode(false);
    };

    const handleRowDelete = async (rowData) => {
        const { _id } = rowData;
        setSaving(true)
        await DeleteTask(_id);
        await loadTodos();
        setSnackbarOpen(true);
        const msg = `Task Deleted Successfully!`;
        setAlertMessage(msg);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const run = async () => {
            setSaving(true);
            await loadTodos();
        }
        run();
    }, []);

    return <div className='container'>
        <div className='top-box'>
            <form onSubmit={handleClick}>
                <TextField
                    disabled={isSaving}
                    required={true}
                    min={3}
                    fullWidth
                    value={todo.name}
                    variant='outlined'
                    type='text'
                    onChange={handleChange}
                    // error={!isInputValid}
                    helperText={!isInputValid ? 'Input must be at least 3 characters' : ''}
                    label='Your Task...'
                />
            </form>
        </div>
        <div className='list-box'>
            <TodoList
                items={todos}
                handleRowClick={handleRowClick}
                handleEditMode={handleEditMode}
                handleRowDelete={handleRowDelete}
            />
        </div>

        {/* Custom Alert */}
        <CustomAlert
            severity={severity}
            isSnackbarOpen={isSnackbarOpen}
            handleSnackbarClose={handleSnackbarClose}
            alertMessage={alertMessage}
        />
        {/* Circular progress bar */}
        {isSaving && <CustomLoader />}
    </div>
}

export default Todo;    