import React, { useContext, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FolderIcon from '@material-ui/icons/Folder';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		maxWidth: '800px',
		backgroundColor: 'white',
		marginTop: '20px',
		borderRadius: '4px',
		boxShadow: '2px 2px 1px lightgray;'
	},
	centered: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingBottom: '24px'
	},
	cardTextStyles: {
		borderBottom: '1px solid #d9d9d9',
		borderRadius: '0.5rem 0.5rem 0 0',
		paddingBottom: '12px'
	},
	noUnderline: {
		textDecoration: 'none'
	}
}));

const ProjectDetail = (props) => {
	const {
		loadOneProject,
		singleProject: project,
		loadProjectMessages,
		messages,
		authId,
		toDos,
		loadProjectToDos
	} = useContext(CookContext);
	const { id } = useParams();

	useEffect(
		() => {
			if (!project) {
				loadOneProject(id);
				loadProjectMessages(id);
				loadProjectToDos(id);
			} else if (project.id !== parseInt(id, 10)) {
				loadOneProject(id);
				loadProjectMessages(id);
				loadProjectToDos(id);
			} else {
				document.title = project.projectName;
			}
		},
		[ loadOneProject, id, project, loadProjectMessages, loadProjectToDos ]
	);

	const classes = useStyles();

	if (!project) return null;

	return (
		<main>
			<Container className={classes.root}>
				<section className={classes.centered}>
					<Typography align="center" variant="h4">
						{project.projectName}
					</Typography>
					<Typography align="center" variant="h5">
						{project.projectDescription}
					</Typography>
				</section>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<NavLink className={classes.noUnderline} to={`/${authId}/projects/${id}/message_board`}>
							<Card>
								<CardContent>
									<Typography className={classes.cardTextStyles} align="center" variant="h6">
										Message Board
									</Typography>
									{messages.map((message) => {
										return (
											<List key={message.id}>
												<ListItem>
													<ListItemAvatar>
														<Avatar>
															<FolderIcon />
														</Avatar>
													</ListItemAvatar>
													<ListItemText primary={message.name} />
												</ListItem>
												<Divider />
											</List>
										);
									})}
								</CardContent>
							</Card>
						</NavLink>
					</Grid>
					<Grid item xs={6}>
						<NavLink className={classes.noUnderline} to={`/${authId}/projects/${id}/to_do`}>
							<Card>
								<CardContent>
									<Typography className={classes.cardTextStyles} align="center" variant="h6">
										To Do
									</Typography>
									{toDos.map((toDo) => {
										return (
											<List key={toDo.id}>
												<ListItem>
													<ListItemAvatar>
														<Avatar>
															<FolderIcon />
														</Avatar>
													</ListItemAvatar>
													<ListItemText primary={toDo.name} />
												</ListItem>
												<Divider />
											</List>
										);
									})}
								</CardContent>
							</Card>
						</NavLink>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
};

export default ProjectDetail;
