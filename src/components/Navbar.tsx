import {useState} from 'react';
import styled from 'styled-components';

interface SidebarProps {
	width: string;
	isOpen: boolean;
	onClose?: () => void;
}

function Navigationbar(props: SidebarProps) {
	const [isCollapsed, setIsCollapsed] = useState(!props.isOpen);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	const sidebarWidth = props.width;

	return (
		<>
			<Topbar />
			<Sidebar style={{width: isCollapsed ? '0px' : sidebarWidth}}>
				<SidebarContent>
					<ToggleButton onClick={toggleSidebar}>
						{isCollapsed ? '>' : '<'}
					</ToggleButton>
					{isCollapsed ? (
						<></>
					) : (
						<>
							<span style={{margin: '40px 40px 5px'}}>Home</span>
							<span style={{margin: '40px 40px 5px'}}>Test Page 1</span>
							<span style={{margin: '40px 40px 5px'}}>Test Page 2</span>
						</>
					)}

					{/*Content of Sidebar*/}
				</SidebarContent>
				{isCollapsed && (
					<SidebarStrip onClick={toggleSidebar}>
						<ToggleButton>{'>'}</ToggleButton>
						{/*Content visible if sidebar is collapsed */}
					</SidebarStrip>
				)}
			</Sidebar>
		</>
	);
}
export default Navigationbar;

const Topbar = styled.div`
	width: 100%;
	height: 60px;
	background-color: #f0f0f0;
	margin-bottom: 20px;
`;

const Sidebar = styled.div`
	position: fixed;
	left: 0;
	height: 100%;
	background-color: #f0f0f0;
	transition: width 0.3s ease;
	overflow-x: hidden;
	z-index: 9999;
	top: 0;
`;

const SidebarContent = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
`;

const ToggleButton = styled.button`
	width: 100%;
	height: 60px;
`;

const SidebarStrip = styled.div`
	position: fixed;
	left: 0;
	height: 100%;
	width: 60px;
	background-color: #f0f0f0;
	z-index: 9998;
	cursor: pointer;
	top: 0;
`;
