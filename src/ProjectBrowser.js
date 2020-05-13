import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	centered: {
		textAlign: 'center'
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
		justifyContent: 'center'
	},
	card: {
		maxWidth: '300px',
		minHeight: '150px'
	}
}));

const ProjectBrowser = (props) => {
	const { projects, loadProjects } = useContext(CookContext);

	useEffect(
		() => {
			if (projects.length === 0) loadProjects();
		},
		[ loadProjects, projects.length ]
	);

	const classes = useStyles();

	return (
		<main>
			<Container className={classes.root}>
				<section className={classes.centered}>
					<h2>Projects</h2>
				</section>
				<Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
					{projects.map((project) => {
						return (
							<Grid item xs={12} sm={6} md={3}>
								<NavLink key={project.id} to={`/projects/${project.id}`}>
									<Card className={classes.card} variant="outlined">
										<CardContent>
											<Typography className={classes.title}>{project.projectName}</Typography>
											<Typography component="p" variant="body2">
												{project.projectDescription}
											</Typography>
										</CardContent>
									</Card>
								</NavLink>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</main>
	);
};

export default ProjectBrowser;
