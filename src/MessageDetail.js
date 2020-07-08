import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

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
		marginBottom: theme.spacing(30)
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
		comments
	} = useContext(CookContext);
	const { projectId, messageId } = useParams();

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
							<Card key={comment.id}>
								<CardContent>
									<Typography variant="body1">{comment.commentText}</Typography>
								</CardContent>
							</Card>
						);
					})}
			</div>
		</Container>
	);
};

export default MessageDetail;
