import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';
import CookContext from './CookContext';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(1)
		},
		submit: {
			margin: theme.spacing(3, 0, 2)
		}
	}));

	const classes = useStyles();

	if (loggedIn) {
		return <Redirect to="/" />;
	}

	if (authToken) {
		return <Redirect to="/" />;
	}

	return (
		// <main>
		// 	<div className="login-panel center middle">
		// 		<div>
		// 			<h1>Login to Start Planning</h1>
		// 			<form onSubmit={handleSubmit}>
		// 				<input
		// 					className="login"
		// 					type="email"
		// 					placeholder="Email"
		// 					value={email}
		// 					onChange={updateEmail}
		// 				/>
		// 				<input
		// 					className="login"
		// 					type="password"
		// 					placeholder="Password"
		// 					value={password}
		// 					onChange={updatePassword}
		// 				/>
		// 				<Button variant="contained" color="primary" type="submit">
		// 					Login
		// 				</Button>
		// 			</form>
		// 		</div>
		// 	</div>
		// </main>
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={updateEmail}
						value={email}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={updatePassword}
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default Login;
