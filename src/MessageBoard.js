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

// use material ui function to display custom styles for this component
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
	},
	mainBackground: {
		backgroundImage:
			"url('https://images.unsplash.com/photo-1452948491233-ad8a1ed01085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80')",
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: '100%'
	}
}));

// helper function to set the breadcrumb
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
	// pull necessary variables from the context provider
	const { authId, singleProject: project, messages, loadProjectMessages, firstInitial, lastInitial } = useContext(
		CookContext
	);

	// grab the id from the url
	const { id } = useParams();

	// set the default state of loaded to be false
	const [ loaded, setLoaded ] = useState(false);

	useEffect(
		() => {
			// set the timeout for 1 second for the loading component to show up
			setTimeout(() => {
				setLoaded(true);
			}, 1000);
			// if the project is not loaded, the set the project for the context provider
			if (!project) {
				loadProjectMessages(id);
			} else if (project.id !== parseInt(id, 10)) {
				loadProjectMessages(id);
			} else {
				// set the title of the browser tab to be the project name
				document.title = `${project.projectName} - Message Board`;
			}
		},
		// eslint-disable-next-line
		[ project, id ]
	);

	const classes = useStyles();

	return (
		<main className={classes.mainBackground}>
			{/* if loaded is false, then display the loading component else, dispay the message/notes board */}
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
							<Typography>All Notes</Typography>
						</Box>
					</section>
					{/* map over the array of message/notes and display using material ui list component */}
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
