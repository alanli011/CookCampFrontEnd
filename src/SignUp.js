import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';
import CookContext from './CookContext';

const SignUp = () => {
	const { login } = useContext(CookContext);
	const [ userName, setUserName ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setlastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ loggedIn, setLoggedIn ] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${baseUrl}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userName, firstName, lastName, email, password })
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

	const updateUserName = (e) => {
		setUserName(e.target.value);
	};

	const updateFirstName = (e) => {
		setFirstName(e.target.value);
	};

	const updateLastName = (e) => {
		setlastName(e.target.value);
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
				<h1>Sign Up For CookCamp</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							className="form-control"
							type="text"
							placeholder="User Name"
							value={userName}
							onChange={updateUserName}
						/>
					</div>
					<div className="form-row form-group">
						<div className="col">
							<input
								className="form-control"
								type="text"
								placeholder="First Name"
								value={firstName}
								onChange={updateFirstName}
							/>
						</div>
						<div className="col">
							<input
								className="form-control"
								type="text"
								placeholder="Last Name"
								value={lastName}
								onChange={updateLastName}
							/>
						</div>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="email"
							placeholder="Email"
							value={email}
							onChange={updateEmail}
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							placeholder="Password"
							value={password}
							onChange={updatePassword}
						/>
					</div>
					<button className="btn btn-primary" type="submit">
						Login
					</button>
				</form>
			</div>
		</main>
	);
};

export default SignUp;
