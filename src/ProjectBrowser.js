import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CookContext from './CookContext';
import Loading from './Loading';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Container, Grid, Button, Avatar, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	centered: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: theme.spacing(2)
	},
	root: {
		flexGrow: 1,
		padding: theme.spacing(2)
	},
	title: {
		fontSize: 14
	},
	myCard: {
		display: 'grid',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	card: {
		maxWidth: '300px',
		minHeight: '150px',
		display: 'flex'
	},
	newCard: {
		maxWidth: '300px',
		minHeight: '150px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	addIconStyle: {
		color: 'green'
	},
	header: {
		position: 'relative',
		'&::before': {
			content: '',
			width: '100%',
			position: 'absolute',
			top: '50%',
			height: '1px',
			backgroundColor: '#555',
			transform: 'translateY(-50%)'
		}
	},
	cards: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},

	noUnderline: {
		textDecoration: 'none'
	},
	buttonStyles: {
		backgroundColor: 'white'
	},
	avatarSize: {
		fontSize: '15px',
		height: '30px',
		width: '30px'
	},
	gridMargin: {
		marginTop: theme.spacing(3)
	}
}));

const ProjectBrowser = (props) => {
	const { authToken, authId, projects, loadProjects, firstInitial, lastInitial } = useContext(CookContext);
	const [ loaded, setLoaded ] = useState(false);

	useEffect(
		() => {
			setTimeout(() => {
				setLoaded(true);
			}, 1000);
			if (projects.length === 0) {
				loadProjects();
			}
		},
		// eslint-disable-next-line
		[ authToken, projects.length ]
	);

	useEffect(() => {
		document.title = 'CookCamp - Projects';
	}, []);

	const classes = useStyles();

	return (
		<main>
			{!loaded && <Loading />}
			{loaded && (
				<Container maxWidth="md" className={classes.root}>
					<section className={classes.centered}>
						<div>
							<Link to={`/${authId}/projects/create-new`} className={classes.noUnderline}>
								<Button
									className={classes.buttonStyles}
									type="button"
									size="small"
									color="default"
									variant="contained"
								>
									<AddIcon className={classes.addIconStyle} /> New
								</Button>
							</Link>
						</div>
						<Typography variant="h3">Projects</Typography>
						<div />
					</section>
					<Divider />

					<Grid
						container
						spacing={2}
						direction="row"
						justify="center"
						alignItems="flex-start"
						className={classes.gridMargin}
					>
						{projects.length === 0 && (
							<Grid item xs={12} sm={6} md={4}>
								<Link to={`/${authId}/projects/create-new`} className={classes.noUnderline}>
									<Card className={classes.newCard} variant="outlined">
										<Typography variant="h6">Create Your First Project!</Typography>
									</Card>
								</Link>
							</Grid>
						)}
						{projects.map((project) => {
							return (
								<Grid item key={project.id} xs={12} sm={6} md={4}>
									<NavLink className={classes.noUnderline} to={`/${authId}/projects/${project.id}`}>
										<Card className={classes.card} variant="outlined">
											<CardContent className={classes.cards}>
												<div>
													<Typography className={classes.title}>
														{project.projectName}
													</Typography>
												</div>
												<div>
													<Typography component="p" variant="body2">
														{project.projectDescription}
													</Typography>
												</div>

												<Avatar
													className={classes.avatarSize}
												>{`${firstInitial}${lastInitial}`}</Avatar>
											</CardContent>
										</Card>
									</NavLink>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			)}
		</main>
	);
};

export default ProjectBrowser;
