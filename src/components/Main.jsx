import Todo from "./Todo";
import classes from "./Main.module.css";
import {useEffect, useState} from "react";
import TodoService from "../service/todo.service";
import TodoForm from "./TodoForm";
import {useAuth} from "./Auth";
import {Box, Typography} from "@mui/material";

const Main = () => {
	const [todos, setTodos] = useState([])
	const auth = useAuth()

	useEffect(() => {
		if (!auth.user) return
		const controller = new AbortController()
		TodoService
			.getAllTodos(controller)
			.then(data => setTodos(data))
	}, [auth.user])

	if (!auth.user) {
		return <Box>
			<Typography component="h2">
				Please login
			</Typography>
		</Box>
	}

	const handleCreateTodo = (todo) => {
		setTodos([todo, ...todos])
	}

	const handleEditTodo = (todo) => {
		setTodos(todos.map(t => t.id === todo.id ? todo : t))
	}

	const handleDeleteTodo = (id) => {
		setTodos(todos.filter(t => t.id !== id))
	}
	return (
		<div className={classes.main}>
			<TodoForm createTodo={handleCreateTodo}/>
			{todos.map(todo =>
				<Todo key={todo.id} id={todo.id}
				      title={todo.title}
				      completed={todo.completed}
				      editTodo={handleEditTodo}
				      deleteTodo={handleDeleteTodo}
				/>)}
		</div>
	)
}

export default Main;
