
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
    const isInputValid = todo?.name?.length >= 3;

    const handleChange = (e) => {
        console.log(e.target.value);
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
    const handleClick = async (e) => {
        e.preventDefault();
        if (todo && !isEditMode && isInputValid) { // Add new Mode
            setSaving(true)
            await CreateTask(todo);
            await loadTodos();
        } else if (todo && isEditMode && isInputValid) { //Edit Mode
            setSaving(true)
            await UpdateTask(todo);
            await loadTodos();
            setIsEditMode(false);
        }
        setTodo({ _id: 0, name: '', isCompleted: false });
        if (isInputValid) {
            const msg = `Task ${isEditMode ? 'Updated' : 'Created'} Successfully!`;
            setAlertMessage(msg);
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
    }, [])
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
            isSnackbarOpen={isSnackbarOpen}
            handleSnackbarClose={handleSnackbarClose}
            alertMessage={alertMessage}
        />
        {/* Circular progress bar */}
        {isSaving && <CustomLoader />}
    </div>
}

export default Todo;    