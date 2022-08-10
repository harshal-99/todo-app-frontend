import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import classes from './TodoForm.module.css'
import TodoService from "../service/todo.service";

const TodoForm = ({createTodo}) => {
	const [todo, setTodo] = useState('');
	const [editMode, setEditMode] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!todo) return
		const savedTodo = await TodoService.createTodo(todo)
		createTodo(savedTodo)
		setTodo('')
		setEditMode(prev => !prev)
	}

	return (
		<>
			{editMode &&
				<Box component="form" className={classes.todoForm} onSubmit={handleSubmit}>
					<TextField required label="Title"
					           value={todo}
					           onChange={(e) => setTodo(e.target.value)}
					/>
					<Button type="submit">Create Todo</Button>
				</Box>
			}
			{!editMode &&
				<Button onClick={() => setEditMode(true)}>Create Todo</Button>
			}
		</>
	)
}

export default TodoForm
