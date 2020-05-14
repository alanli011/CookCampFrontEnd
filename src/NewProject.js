import React, { useState, useEffect, useContext } from 'react';
import { baseUrl } from './config';
import { Redirect } from 'react-router-dom';
import CookContext from './CookContext';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NoteIcon from '@material-ui/icons/Note';

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

const NewProject = () => {
	const { authId, setProjects, projects } = useContext(CookContext);
	const [ projectName, setProjectName ] = useState('');
	const [ projectDescription, setProjectDescription ] = useState('');
	const [ redirect, setRedirect ] = useState(false);

	const updateProjectName = (e) => {
		setProjectName(e.target.value);
	};

	const updateProjectDescription = (e) => {
		setProjectDescription(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${baseUrl}/users/${authId}/projects`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user: {
						id: authId
					},
					projectName,
					projectDescription
				})
			});
			if (!res.ok) {
				throw res;
			}
			const { project } = await res.json();
			console.log(project);
			setProjects([ ...projects, project ]);
			setRedirect(true);
		} catch (err) {
			console.error(err);
		}
	};

	const classes = useStyles();

	useEffect(() => {
		document.title = 'Create New Project';
	}, []);

	if (redirect) {
		return <Redirect to={`/${authId}/projects`} />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<NoteIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Create a New Project
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="projectName"
						label="Project Name"
						name="projectName"
						autoComplete="email"
						autoFocus
						onChange={updateProjectName}
						value={projectName}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						name="projectDescription"
						label="Project Description"
						id="projectDescription"
						value={projectDescription}
						onChange={updateProjectDescription}
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Submit
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default NewProject;
