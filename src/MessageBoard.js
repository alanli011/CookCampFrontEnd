import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CookContext from './CookContext';
import Loading from './Loading';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		backgroundColor: 'white',
		marginTop: '20px',
		borderRadius: '4px',
		boxShadow: '1px 1px 5px lightgray, -1px -1px 5px lightgray;'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottom: '2px solid gray',
		padding: '15px 0'
	},
	noUnderline: {
		textDecoration: 'none',
		color: 'inherit'
	},
	newMessageButton: {
		backgroundColor: 'green',
		borderRadius: '30px',
		color: 'white'
	},
	addIconStyle: {
		color: 'white'
	},
	boxStyle: {
		border: '1px solid black',
		borderRadius: '30px',
		padding: '5px 10px',
		cursor: 'not-allowed'
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
			<Link color="inherit" to="#">
				Notes Board
			</Link>
		</Breadcrumbs>
	);
};

const MessageBoard = () => {
	const { authId, singleProject: project, messages, loadProjectMessages, firstInitial, lastInitial } = useContext(
		CookContext
	);
	const { id } = useParams();
	const [ loaded, setLoaded ] = useState(false);

	useEffect(
		() => {
			setTimeout(() => {
				setLoaded(true);
			}, 1000);
			if (!project) {
				loadProjectMessages(id);
			} else if (project.id !== parseInt(id, 10)) {
				loadProjectMessages(id);
			} else {
				document.title = `${project.projectName} - Message Board`;
			}
		},
		// eslint-disable-next-line
		[ project, id ]
	);

	const classes = useStyles();

	return (
		<main>
			{!loaded && <Loading />}
			{loaded && (
				<Container maxWidth="md" className={classes.root}>
					<ActiveLastBreadcrumb authId={authId} projectId={id} />
					<section className={classes.header}>
						<Link
							to={`/${authId}/projects/${id}/messsage_board/message/new`}
							className={classes.noUnderline}
						>
							<Button type="button" size="small" variant="contained" className={classes.newMessageButton}>
								<AddIcon className={classes.addIconStyle} />
								New Note
							</Button>
						</Link>
						<Typography variant="h4">Notes Board</Typography>
						<Box className={classes.boxStyle}>
							<Typography>All Notess</Typography>
						</Box>
					</section>
					{messages.map((message) => {
						return (
							<Link
								to={`/${authId}/projects/${id}/message_board/message/${message.id}`}
								className={classes.noUnderline}
								key={message.id}
							>
								<List>
									<ListItem>
										<ListItemAvatar>
											<Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
										</ListItemAvatar>
										<ListItemText primary={message.name} />
									</ListItem>
									<Divider />
								</List>
							</Link>
						);
					})}
				</Container>
			)}
		</main>
	);
};

export default MessageBoard;
