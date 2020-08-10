import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CookContext from './CookContext';
import { baseUrl } from './config';
import Loading from './Loading';

import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	Typography,
	Container,
	Avatar,
	Divider,
	TextField,
	Button,
	Breadcrumbs
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '100vh',
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
	},
	mainBackground: {
		backgroundImage:
			"url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1335&q=80')",
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: '100%'
	}
}));

// function to set the breadcrumbs
const ActiveLastBreadcrumb = (props) => {
	return (
		<Breadcrumbs area-label="breadcrumb">
			<Link color="inherit" to={`/${props.authId}/projects`}>
				Home
			</Link>
			<Link color="inherit" to={`/${props.authId}/projects/${props.projectId}`}>
				Project
			</Link>
			<Link color="inherit" to={`/${props.authId}/projects/${props.projectId}/message_board`}>
				Notes Board
			</Link>
			<Link color="textPrimary" aria-current="page" to="#">
				Notes
			</Link>
		</Breadcrumbs>
	);
};

// will need to include the comments section
const MessageDetail = () => {
	// grab the variables from the context provider to be used
	const {
		authId,
		user,
		firstInitial,
		lastInitial,
		singleMessage: message,
		loadOneProjectMessage,
		loadMessageComments,
		comments,
		setComments
	} = useContext(CookContext);

	// get projectId and messageid from the params
	const { projectId, messageId } = useParams();

	// set the default state of the comment
	const [ commentValue, setCommentValue ] = useState('');

	// set the default state of the loaded
	const [ loaded, setLoaded ] = useState(false);

	// function to handle the comment textfield
	const handleCommentChange = (e) => {
		setCommentValue(e.target.value);
	};

	// function to post a comment
	const handleCommentSubmit = async (e) => {
		// set the default of the submit button to prevent the default
		e.preventDefault();

		// try / catch. if it succeeds, set the new state and the spread the old state
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
			// set the comment field back to default
			setCommentValue('');
		} catch (error) {
			console.error(error);
		}
	};

	// this useEffect will monitor the state of the messages
	useEffect(
		() => {
			if (!message) {
				loadOneProjectMessage(messageId);
				loadMessageComments(projectId, messageId);
				setLoaded(true);
			} else if (message.id !== parseInt(messageId, 10)) {
				loadOneProjectMessage(messageId);
				loadMessageComments(projectId, messageId);
				setLoaded(true);
			} else {
				document.title = message.name;
			}
		},
		[ message, loadOneProjectMessage, messageId, projectId, loadMessageComments ]
	);

	const classes = useStyles();

	if (!message) return null;

	return (
		<main className={classes.mainBackground}>
			<Container maxWidth="md" className={classes.root}>
				{!loaded && <Loading />}
				{loaded && (
					<React.Fragment>
						<ActiveLastBreadcrumb authId={authId} projectId={projectId} />
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
					</React.Fragment>
				)}
			</Container>
		</main>
	);
};

export default MessageDetail;
