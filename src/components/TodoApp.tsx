// src/components/TodoApp.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTodo, toggleTodo, deleteTodo } from '../features/todoSlice';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoApp: React.FC = () => {
  const [task, setTask] = useState('');
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Redux Todo App
      </Typography>
      <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="New Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          style={{ marginTop: '1rem' }}
        >
          Add Task
        </Button>
      </Paper>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} dense divider>
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <ListItemText
              primary={todo.text}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            />
            <IconButton edge="end" onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoApp;
