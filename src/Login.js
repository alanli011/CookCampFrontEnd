import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';
import CookContext from './CookContext';

const Login = () => {
	const { login, authToken } = useContext(CookContext);
	const [ loggedIn, setLoggedIn ] = useState(false);
	const [ email, setEmail ] = useState('demoUser@demo.com');
	const [ password, setPassword ] = useState('cooking');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${baseUrl}/users/token`, {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!res.ok) {
				throw res;
			}
			const { token, user: { id } } = await res.json();
			setLoggedIn(true);
			login(token, id);
		} catch (err) {
			console.error(err);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (loggedIn) {
		return <Redirect to="/" />;
	}

	if (authToken) {
		return <Redirect to="/" />;
	}

	return (
		<main>
			<div className="login-panel center middle">
				<div>
					<h1>Login to Start Planning</h1>
					<form onSubmit={handleSubmit}>
						<input
							className="login"
							type="email"
							placeholder="Email"
							value={email}
							onChange={updateEmail}
						/>
						<input
							className="login"
							type="password"
							placeholder="Password"
							value={password}
							onChange={updatePassword}
						/>
						<button className="btn btn-primary" type="submit">
							Login
						</button>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Login;
