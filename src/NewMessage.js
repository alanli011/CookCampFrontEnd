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
	messageTitle: {
		fontSize: '3rem'
	}
}));

const NewMessage = (props) => {
	const { setMessages, messages } = useContext(CookContext);
	const [ messageName, setMessageName ] = useState('');
	const [ messageDescription, setMessageDescription ] = useState('');
	const { id } = useParams();

	useEffect(() => {
		document.title = 'Create New Message';
	});

	const updateMessageName = (e) => {
		setMessageName(e.target.value);
	};

	const updateMessageDescription = (e) => {
		setMessageDescription(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${baseUrl}/projects/${id}/messages/`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: messageName,
					description: messageDescription,
					projectId: id
				})
			});
			if (!res.ok) {
				throw res;
			}
			const { message } = await res.json();
			setMessages([ ...messages, message ]);
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
					Post a New Message
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						className={classes.messageTitle}
						margin="normal"
						required
						fullWidth
						id="messageName"
						label="Type a title..."
						name="messageName"
						onChange={updateMessageName}
						value={messageName}
						size="medium"
						variant="outlined"
					/>
					<TextField
						id="messageDescription"
						multiline
						rows={20}
						value={messageDescription}
						placeholder="Write away..."
						fullWidth
						onChange={updateMessageDescription}
					/>
					<Button type="submit" variant="contained" color="primary" className={classes.submit}>
						Post this message
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default withRouter(NewMessage);
