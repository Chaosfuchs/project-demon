import {useEffect, useState} from 'react';
import shortUUID from 'short-uuid';
import styled from 'styled-components';

import LabledInput from '../components/LabeledInput';

interface User {
	id: any;
	username: string;
	firstname?: string;
	lastname?: string;
	password: string;
}

class UserAccount {
	id: any;
	username: string;
	password: string;

	constructor(username: string, password: string) {
		this.id = shortUUID.generate();
		this.username = username;
		this.password = password;
	}
}

function Form() {
	const [userName, setUserName] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [userArray, setUserArray] = useState<User[]>([]);

	const createUser = () => {
		validateUser(userName, userPassword);
		//setUserArray([...userArray, newUser]);
		setUserName('');
		setUserPassword('');
	};

	const validateUser = (name: string, password: string) => {
		if (name && password) {
			if (
				userArray.find((user: User) => {
					return user.username === name.trim();
				})
			) {
				alert('This User already exists!');
			} else {
				const newUser: User = new UserAccount(userName, userPassword);
				setUserArray([...userArray, newUser]);
			}
		} else {
			alert('Please enter User Informations!');
		}
	};

	const deleteItem = (id: string) => {
		const updatedUserArray = userArray.filter((ListItem) => ListItem.id !== id);
		setUserArray(updatedUserArray);
	};

	useEffect(() => {
		const userList = localStorage.getItem('User');
		if (userList) {
			setUserArray(JSON.parse(userList));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('User', JSON.stringify(userArray));
	}, [userArray]);

	return (
		<Container>
			<Card>
				<div>
					<div style={{marginBottom: '20px'}}>
						<LabledInput
							name={'Username'}
							value={userName}
							onChange={setUserName}
						/>
						<LabledInput
							name={'Password'}
							value={userPassword}
							isPasswordField={true}
							onChange={setUserPassword}
						/>
					</div>

					<StyledButton onClick={createUser}>Enter</StyledButton>
				</div>
			</Card>
			{userArray.length > 0 ? (
				<CardList>
					<div style={{margin: '30px'}}>
						{userArray.map((user: User) => {
							return (
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										margin: '10px',
										padding: '10px',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '50px',
									}}
									key={user.id}
								>
									<span>ID: {user.id}</span>
									<span>Username: {user.username}</span>
									<span>Password: {user.password}</span>
									<button onClick={() => deleteItem(user.id)}>X</button>
								</div>
							);
						})}
					</div>
				</CardList>
			) : (
				<></>
			)}
		</Container>
	);
}

export default Form;

const Container = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Card = styled.div`
	border: 2px solid black;
	background-color: lightgrey;
	border-radius: 5px;
	width: 250px;
	padding: 20px;
	margin: 5px;
`;

const CardList = styled.div`
	border: 2px solid black;
	background-color: lightgrey;
	border-radius: 5px;
	width: 600px;
	padding: 20px;
	margin: 5px;
`;

const StyledButton = styled.button`
	width: 100px;
	height: 30px;
	border-radius: 5px;
`;
