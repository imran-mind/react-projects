
import React, { useEffect, useState } from 'react';
import './Todo.css';
import { TextField } from '@mui/material';
import TodoList from './TodoList';
import CustomLoader from './CustomLoader';
import CustomAlert from './CustomAlert';

const Todo = () => {
    const [todo, setTodo] = useState({ id: 0, data: '', isDone: false });
    const [todos, setTodos] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isSaving, setSaving] = useState(false);
    const isInputValid = todo.data.length >= 3;

    const handleChange = (e) => {
        console.log(e.target.value);
        if (isEditMode) {
            setTodo({ id: todo.id, data: e.target.value });
        } else {
            setTodo({ id: Date.now(), data: e.target.value });
        }
    }

    const handleEditMode = (item) => {
        setIsEditMode((isEditMode) => !isEditMode);
        setTodo(item);
    }

    //To restore items from localstorage if page refresh
    useEffect(() => {
        const items = localStorage.getItem("todos");
        setTodos(items ? JSON.parse(items) : []);
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        setSaving(true)
        if (todo && !isEditMode && isInputValid) { // Add new Mode
            console.log(e.keyCode);
            const newTodos = [...todos, todo];
            localStorage.setItem("todos", JSON.stringify(newTodos));
            setTodos(newTodos);

        } else if (todo && isEditMode && isInputValid) { //Edit Mode
            console.log(todo, isEditMode);
            const copyTodos = [...todos];
            const newTodos = copyTodos.map((item) => { //updated list
                if (item.id === todo.id) {
                    item.data = todo.data;
                    console.log('if block ', item);
                }
                return item;
            });
            localStorage.setItem("todos", JSON.stringify(newTodos));
            console.log(newTodos)
            setTodos(newTodos);
            setIsEditMode(false);
        }
        setTodo({ id: 0, data: '', isDone: false });
        const msg = `Task ${isEditMode ? 'Updated' : 'Created'} Successfully!`;
        setAlertMessage(msg);
        setSnackbarOpen(true);
        setTimeout(() => {
            setSaving(false)
        }, 2000)
    }

    const handleRowClick = (clickedItem) => {
        console.log('handlerowclick ', clickedItem);
        const copyTodos = [...todos];
        const newTodos = copyTodos.map((item) => {
            if (item.id === clickedItem.id) {
                item.isDone = !item.isDone;
            }
            return item;
        });
        console.log(newTodos)
        setTodos(newTodos);
    };

    const handleRowDelete = (rowData) => {
        const { id } = rowData;
        const copyTodos = [...todos];
        const list = copyTodos.filter((item) => item.id !== id);
        setTodos(list);
        localStorage.setItem("todos", JSON.stringify(list));
        setSnackbarOpen(true);
        const msg = `Task Deleted Successfully!`;
        setAlertMessage(msg);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return <div className='container'>
        <div className='top-box'>
            <form onSubmit={handleClick}>
                <TextField
                    disabled={isSaving}
                    required={true}
                    min={3}
                    fullWidth
                    autoFocus
                    value={todo.data}
                    type='text'
                    onChange={handleChange}
                    // error={!isInputValid}
                    helperText={!isInputValid ? 'Input must be at least 3 characters' : ''}
                    placeholder='Your Task...'
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