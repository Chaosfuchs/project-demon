import {cx} from '@emotion/css';
import {todoListCss, flexCenter, flexRow} from '../global-styles.js';

export default function TodoEntryList(props) {
	const todos = props.todos;
	return (
		<>
			<label style={{display: 'flex'}}>{props.listName}</label>
			{todos.filter(props.filterFunction).map((todo) => (
				<div key={todo.id} className={cx(todoListCss, flexRow, flexCenter)}>
					<input
						style={{width: '20px'}}
						type='checkbox'
						checked={todo.done}
						onChange={(event) => {
							const checked = event.target.checked;
							props.onDoneChange && props.onDoneChange(checked, todo.id);
						}}
					></input>
					<label
						style={{
							paddingTop: '6px',
							color: todo.done ? 'gray' : '',
							textDecoration: todo.done ? 'line-through' : 'none',
						}}
					>
						{todo.text}
					</label>
					<div style={{flex: 1}}></div>
					<button
						onClick={() => props.onTodoDelete && props.onTodoDelete(todo.id)}
					>
						X
					</button>
				</div>
			))}
		</>
	);
}
