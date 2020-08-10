import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { baseUrl } from './config';
import CookContext from './CookContext';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// use material ui function to create custom styling for this component
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
	},
	error: {
		color: 'red'
	}
}));

// helper function to validate email and password. if there is an error, it will push the error to the array to be rendered
const validate = (email, password) => {
	const errorsArray = [];
	if (!email) {
		errorsArray.push('Please provide a valid email address.');
	}

	if (!password) {
		errorsArray.push('Please provide a valid password');
	}
	return errorsArray;
};

const Login = () => {
	// grab the context variables from the provider
	const { authId, login, authToken } = useContext(CookContext);

	// set the default state of the login field for demo user
	const [ email, setEmail ] = useState('demoUser@demo.com');
	const [ password, setPassword ] = useState('cooking');

	// set the default validation error state
	const [ validationErrors, setValidationErrors ] = useState([]);

	// set the browser tab title
	useEffect(() => {
		document.title = 'CookCamp - Login';
	}, []);

	// function to handle the submit button for this login form. will stop the default function of a submit button
	const handleSubmit = async (e) => {
		e.preventDefault();

		// set the validation error state with the validate helper function passed in
		setValidationErrors(validate(email, password));
		try {
			const res = await fetch(`${baseUrl}/users/token`, {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!res.ok) {
				const errors = await res.json();
				setValidationErrors(errors.errors);
				throw res;
			}
			const { token, user: { id } } = await res.json();
			login(token, id);
		} catch (err) {
			console.error(err);
		}
	};

	// function to set the state for the email field
	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	// function to set the state for the password field
	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const classes = useStyles();

	// if the authToken and authid is avaiable, then redirect user to their projects
	if (authToken && authId) {
		return <Redirect to={`/${authId}/projects`} />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{/* if the validation errors state is not empty, then loop over and display the errors as a list */}
				{validationErrors.length > 0 && (
					<div className={classes.error}>
						The following errors were found:
						<ul>{validationErrors.map((error) => <li key={error}>{error}</li>)}</ul>
					</div>
				)}
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
