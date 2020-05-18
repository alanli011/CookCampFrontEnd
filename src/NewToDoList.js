import React, { useState, useEffect, useContext } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { baseUrl } from './config';
import CookContext from './CookContext';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '100vh',
		backgroundColor: 'white',
		boxShadow: '1px 1px 5px lightgray, -1px -1px 5px lightgray;'
	},
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
	listTitle: {
		fontSize: '3rem'
	}
}));

const NewToDoList = (props) => {
	const { toDos, setToDos } = useContext(CookContext);

	const [ listName, setListName ] = useState('');
	const { id } = useParams();

	useEffect(() => {
		document.title = 'Create New List';
	});

	const updateListName = (e) => {
		setListName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${baseUrl}/projects/${id}/to-do`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: listName,
					projectId: id
				})
			});

			if (!res.ok) {
				throw res;
			}

			const { toDo } = await res.json();
			setToDos([ ...toDos, toDo ]);
			props.history.goBack();
		} catch (err) {
			console.error(err);
		}
	};

	const classes = useStyles();

	return (
		<Container maxWidth="md" className={classes.root}>
			<div className={classes.paper}>
				<Typography className={classes.submit} variant="h4">
					Create a New List
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						className={classes.listTitle}
						margin="normal"
						required
						fullWidth
						id="listTitle"
						label="Type a title..."
						name="listTitle"
						value={listName}
						onChange={updateListName}
						size="medium"
						variant="outlined"
					/>
					<Button type="submit" variant="contained" color="primary" className={classes.submit}>
						Add this list
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default withRouter(NewToDoList);
