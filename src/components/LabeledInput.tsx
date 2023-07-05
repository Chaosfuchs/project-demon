import {useState} from 'react';
import styled from 'styled-components';

export interface LabeldInputProps {
	name: string;
	value: string;
	onChange: (value: any) => void;
	isPasswordField?: boolean;
}

function LabledInput(props: LabeldInputProps) {
	const [passwordState, setPasswordState] = useState(true);

	const handleClickShowPassword = () => {
		setPasswordState(!passwordState);
	};

	return (
		<Container>
			<StyledLabel>{props.name}</StyledLabel>
			<div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
				<StyledInput
					value={props.value}
					type={props.isPasswordField && passwordState ? 'password' : 'text'}
					onChange={(event: any) => props.onChange(event.target.value)}
					autoComplete=''
				></StyledInput>
				{props.isPasswordField ? (
					<button onClick={handleClickShowPassword}>Toggle</button>
				) : (
					<></>
				)}
			</div>
		</Container>
	);
}
export default LabledInput;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledLabel = styled.label`
	height: 30px;
`;

const StyledInput = styled.input`
	height: 30px;
	border-radius: 5px;
	border: none;
`;
