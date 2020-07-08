import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CookContext from './CookContext';
import { baseUrl } from './config';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Container, Avatar, Divider, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '100vh',
		marginTop: '20px',
		backgroundColor: 'white',
		boxShadow: '1px 1px 5px lightgray, -1px -1px 5px lightgray;'
	},
	spacing: {
		padding: theme.spacing(6)
	},
	titleStyles: {
		paddingBottom: theme.spacing(2)
	},
	messageUserStyle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	descriptionStyles: {
		paddingTop: theme.spacing(2),
		marginBottom: theme.spacing(4)
	},
	card: {
		marginBottom: theme.spacing(1)
	},
	leaveComment: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		marginTop: theme.spacing(3)
	}
}));

// will need to include the comments section
const MessageDetail = () => {
	const {
		user,
		firstInitial,
		lastInitial,
		singleMessage: message,
		loadOneProjectMessage,
		loadMessageComments,
		comments,
		setComments
	} = useContext(CookContext);
	const { projectId, messageId } = useParams();

	const [ commentValue, setCommentValue ] = useState('');

	const handleCommentChange = (e) => {
		setCommentValue(e.target.value);
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${baseUrl}/projects/${projectId}/messages/${messageId}/comments`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					commentText: commentValue,
					messageId
				})
			});
			if (!res.ok) {
				throw res;
			}

			const { comment } = await res.json();
			setComments([ comment, ...comments ]);
			setCommentValue('');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(
		() => {
			if (!message) {
				loadOneProjectMessage(messageId);
				loadMessageComments(projectId, messageId);
			} else if (message.id !== parseInt(messageId, 10)) {
				loadOneProjectMessage(messageId);
				loadMessageComments(projectId, messageId);
			} else {
				document.title = message.name;
			}
		},
		[ message, loadOneProjectMessage, messageId, projectId, loadMessageComments ]
	);

	const classes = useStyles();

	if (!message) return null;

	return (
		<Container maxWidth="md" className={classes.root}>
			<div className={classes.spacing}>
				<Typography className={classes.titleStyles} variant="h4">
					{message.name}
				</Typography>
				<Divider />
				<div className={classes.messageUserStyle}>
					<Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
					<Typography variant="h6">{user.userName}</Typography>
				</div>
				<Divider />
				<Typography className={classes.descriptionStyles} variant="h6">
					{message.description}
				</Typography>
				{comments &&
					comments.map((comment) => {
						return (
							<Card key={comment.id} className={classes.card}>
								<CardContent>
									<Typography variant="body1">{comment.commentText}</Typography>
								</CardContent>
							</Card>
						);
					})}
				<div className={classes.leaveComment}>
					<TextField
						multiline
						rows={6}
						variant="outlined"
						label="Comment"
						placeholder="Leave a comment"
						value={commentValue}
						onChange={handleCommentChange}
					/>
					<Button type="submit" variant="contained" color="primary" onClick={handleCommentSubmit}>
						Post
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default MessageDetail;
