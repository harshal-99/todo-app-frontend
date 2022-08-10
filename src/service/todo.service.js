import {REACT_APP_BACKEND_URL} from "../utils/config";
import axios from "axios";

const getAllTodos = async (controller) => {
	const response = await fetch(REACT_APP_BACKEND_URL + '/api/todo', {
		headers: {
			'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
		},
		signal: controller.signal
	});
	const todos = await response.json();
	return todos;
}

const createTodo = async (todo) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/todo', {
		title: todo
	}, {
		headers: {
			'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
		},
	})
	return response.data
}

const getTodoById = async (id, controller) => {
	const response = await axios.get(REACT_APP_BACKEND_URL + '/api/todo/' + id, {
		headers: {
			'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
		},
		signal: controller.signal
	})
	return response.data
}

const editTodo = async (todo, controller) => {
	const response = await axios.put(REACT_APP_BACKEND_URL + '/api/todo/' + todo.id, {
		title: todo.title,
		completed: todo.completed
	}, {
		headers: {
			'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
		},
		signal: controller?.signal
	})
	return response.data
}

const deleteTodo = async (id, controller) => {
	const response = await axios.delete(REACT_APP_BACKEND_URL + '/api/todo/' + id, {
		headers: {
			'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
		},
		signal: controller?.signal
	})
	return response
}

const TodoService = {getAllTodos, createTodo, getTodoById, editTodo, deleteTodo}

export default TodoService
