import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { baseUrl } from './config';
import CookContext from './CookContext';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const Login = () => {
	const { login, authToken } = useContext(CookContext);
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

	const classes = useStyles();

	if (authToken) {
		return <Redirect to="/" />;
	}

	return (
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
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/signup" variant="body2">
								Don't have an account? Sign Up!
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Login;
