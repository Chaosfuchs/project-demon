import {useState, useEffect} from 'react';
import TodoInput from '../components/TodoInput.jsx';
import TodoList from '../components/TodoList.jsx';
import {appCss} from '../global-styles.js';

function FeatureTodo() {
	const [todos, setTodos] = useState([]);

	function saveTodosInLS(todos) {
		window.localStorage.setItem('todos', JSON.stringify(todos));
		console.log('Saved: ', todos);
	}
	// Simulation als würden Daten aus einer Datenbank geladen
	async function loadTodosFromLS() {
		return new Promise((resolve) => {
			setTimeout(() => {
				const todos = JSON.parse(window.localStorage.getItem('todos'));
				resolve(todos);
			}, 500);
		});
	}

	useEffect(() => {
		loadTodosFromLS().then((initialTodos) => setTodos(initialTodos));
	}, []);

	return (
		<div className={appCss}>
			<TodoInput
				onAddClicked={(todo) => {
					setTodos((oldTodos) => {
						const newTodos = [
							...oldTodos,
							{
								text: todo,
								done: false,
								id: Date.now() * Math.random().toString(), // könnte auch eine UUID sein, für diesen Zweck gerade okay
							},
						];
						saveTodosInLS(newTodos);
						return newTodos;
					});
				}}
			/>
			<TodoList
				todos={todos}
				onDoneChange={(done, id) => {
					setTodos((oldTodos) => {
						const newTodos = oldTodos.map((todo) =>
							todo.id === id ? Object.assign(todo, {done}) : todo,
						);
						saveTodosInLS(newTodos);
						return newTodos;
					});
				}}
				onTodoDelete={(todoId) => {
					setTodos((oldTodos) => {
						const newTodos = oldTodos.filter((todo) => todo.id !== todoId);
						saveTodosInLS(newTodos);
						return newTodos;
					});
				}}
			/>
		</div>
	);
}

export default FeatureTodo;
