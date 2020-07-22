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
			<Link color="textPrimary" aria-current="page">
				Notes
			</Link>
		</Breadcrumbs>
	);
};

// will need to include the comments section
const MessageDetail = () => {
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
	const { projectId, messageId } = useParams();

	const [ commentValue, setCommentValue ] = useState('');
	const [ loaded, setLoaded ] = useState(false);

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
	);
};

export default MessageDetail;
