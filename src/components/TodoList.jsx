import TodoEntryList from './TodoEntryList.jsx';

export default function TodoList(props) {
	const todos = props.todos;

	return (
		<>
			<TodoEntryList
				todos={todos}
				listName='Todo: '
				onDoneChange={props.onDoneChange}
				onTodoDelete={props.onTodoDelete}
				filterFunction={(todo) => !todo.done}
			/>

			<hr style={{width: '100%'}} />

			<TodoEntryList
				todos={todos}
				listName='Done: '
				onDoneChange={props.onDoneChange}
				onTodoDelete={props.onTodoDelete}
				filterFunction={(todo) => todo.done}
			/>
		</>
	);
}
