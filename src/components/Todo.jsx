import {Box, Button, Card, CardActions, CardContent, Checkbox, TextField, Typography} from "@mui/material";
import classes from './Todo.module.css'
import {useState} from "react";
import TodoService from "../service/todo.service";

const Todo = ({title, completed, id, editTodo, deleteTodo}) => {
	const [done, setDone] = useState(Boolean(completed))
	const [edit, setEdit] = useState(false)
	const [todo, setTodo] = useState(title)

	const handleDone = () => {
		setDone(prev => !prev)
	}

	const handleTodoEdit = async (event) => {
		event.preventDefault()
		const Todo = await TodoService.editTodo({id, title: todo, completed: done})
		editTodo(Todo)
		setEdit(false)
	}

	const handleDeleteTodo = async () => {
		await TodoService.deleteTodo(id)
		deleteTodo(id)
	}


	return (
		<Card className={classes.todo}>
			{!edit &&
				<CardContent>
					<Typography className={done ? classes.done : ''} color="text.secondary" component="h2" variant="h2">
						{todo}
					</Typography>
					<CardActions>
						<Button variant="outlined" onClick={() => setEdit(true)}>Edit</Button>
						<Button variant="outlined" onClick={handleDeleteTodo}>Delete</Button>
					</CardActions>
				</CardContent>
			}
			{edit &&
				<Box component="form" onSubmit={handleTodoEdit}
				     style={{display: "flex", flexDirection: "column", marginTop: "0.5rem"}}>
					<TextField label="Title" value={todo} onChange={e => setTodo(e.target.value)}/>
					<Box>
						<Checkbox checked={done} onChange={handleDone}
						          color="primary"
						/>
						<Button type="submit">Edit</Button>
					</Box>
				</Box>
			}
		</Card>
	)
}

export default Todo
