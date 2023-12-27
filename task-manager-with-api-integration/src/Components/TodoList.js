import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = (props) => {
    const { items,
        handleRowClick,
        handleEditMode,
        handleRowDelete } = props;
    return (
        <List>
            {items && items.map((item, index) => (
                <ListItem key={item.id} className='todo-item'>
                    <ListItemText
                        style={{
                            fontSize: '20px'
                        }}
                        className={item.isDone ? 'strik-through' : null}
                        onClick={() => handleRowClick(item)}
                        primary={item.data}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            style={{ color: '#1e90ff' }}
                            onClick={() => handleEditMode(item)}
                            edge="end"
                            aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            style={{ color: '#b22222' }}
                            onClick={() => handleRowDelete(item)}
                            edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
            {
                (!items || items.length === 0) &&
                <div>
                    No Task Found
                </div>
            }
        </List>
    );
};

export default TodoList;
