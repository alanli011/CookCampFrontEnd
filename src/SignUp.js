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
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	error: {
		color: 'red'
	}
}));

// function to validate all the required fields to sign up
const validate = (firstName, lastName, username, email, password) => {
	let errorsArray = [];
	if (!firstName) {
		errorsArray.push('Please provide a First Name');
	}

	if (!lastName) {
		errorsArray.push('Please provide a Last Name');
	}

	if (!username) {
		errorsArray.push('Please provide a Username');
	}

	if (!email) {
		errorsArray.push('Please provide a Email');
	}

	if (!password) {
		errorsArray.push('Please provide a password');
	}
	return errorsArray;
};

const SignUp = () => {
	const { authId, login, authToken } = useContext(CookContext);
	const [ userName, setUserName ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setlastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ validationErrors, setValidationErrors ] = useState([]);

	useEffect(() => {
		document.title = 'CookCamp - Sign Up';
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setValidationErrors(validate(firstName, lastName, userName, email, password));
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
			login(token, id);
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

	const classes = useStyles();

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
					Sign up
				</Typography>
				{validationErrors.length > 0 && (
					<div className={classes.error}>
						The following errors were found:
						<ul>{validationErrors.map((error) => <li key={error}>{error}</li>)}</ul>
					</div>
				)}
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={firstName}
								onChange={updateFirstName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								value={lastName}
								onChange={updateLastName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="userName"
								label="Usename"
								name="userName"
								autoComplete="userName"
								value={userName}
								onChange={updateUserName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={email}
								onChange={updateEmail}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
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
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default SignUp;
