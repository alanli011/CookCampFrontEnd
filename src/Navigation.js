import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
// import Nav from 'react-bootstrap/Nav';
import CookContext from './CookContext';

const Navigation = () => {
	const { authToken } = useContext(CookContext);

	return (
		<nav className="main-navigation nav-tabs justify-content-between">
			<div>
				<h3>CookCamp</h3>
			</div>
			<div>
				<NavLink to="/">Home</NavLink>
			</div>
			<div>
				{authToken ? (
					<div>User</div>
				) : (
					<React.Fragment>
						<NavLink to="/login">Login</NavLink> | <NavLink to="/signup">Sign Up</NavLink>
					</React.Fragment>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
