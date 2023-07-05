import {useState} from 'react';
import {cx} from '@emotion/css';
import {
	todoInputCss,
	flexRow,
	flexColumn,
	borderRadiusRound,
	headerMain,
} from '../global-styles.js';

export default function TodoInput(props) {
	const [todo, setTodo] = useState('');

	return (
		<div className={cx(todoInputCss, flexColumn)}>
			<span className={headerMain}>New todo: </span>
			<div className={flexRow}>
				<input
					className={borderRadiusRound}
					type='text'
					value={todo}
					onChange={(event) => setTodo(event.target.value)}
				></input>
				<button
					onClick={() => {
						props.onAddClicked && props.onAddClicked(todo);
						setTodo('');
					}}
				>
					Add
				</button>
			</div>
		</div>
	);
}
