import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';
import CookContext from './CookContext';

const Login = () => {
	const { login } = useContext(CookContext);
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
			window.localStorage.setItem('state-cookcamp-id', id);
			setLoggedIn(true);
			login(token);
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

	return (
		<main className="center middle">
			<div>
				<h1>Login to Start Planning</h1>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Email" value={email} onChange={updateEmail} />
					<input type="password" placeholder="Password" value={password} onChange={updatePassword} />
					<button className="btn btn-primary" type="submit">
						Login
					</button>
				</form>
			</div>
		</main>
	);
};

export default Login;
