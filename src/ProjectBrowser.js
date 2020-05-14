import React, { useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	centered: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center'
	},
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		maxWidth: '800px'
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
	},
	addIconStyle: {
		color: 'green'
	},
	newButton: {
		position: 'relative',
		right: '30%'
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
		flexDirection: 'column'
	},

	noUnderline: {
		textDecoration: 'none'
	}
}));

const ProjectBrowser = (props) => {
	const { authToken, authId, projects, loadProjects, firstInitial, lastInitial } = useContext(CookContext);

	useEffect(
		() => {
			if (projects.length === 0) {
				loadProjects();
			}
		},
		[ authToken, projects.length ]
	);

	useEffect(() => {
		document.title = 'CookCamp - Projects';
	}, []);

	const classes = useStyles();

	return (
		<main>
			<Container className={classes.root}>
				<section className={classes.centered}>
					<div className={classes.newButton}>
						<Link to={`/${authId}/projects/create-new`} className={classes.noUnderline}>
							<Button type="button" size="small" color="default" variant="contained">
								<AddIcon className={classes.addIconStyle} /> New
							</Button>
						</Link>
					</div>
					<div className={classes.header}>
						<h2>Projects</h2>
					</div>
				</section>

				<Grid container spacing={2} direction="row" justify="center" alignItems="flex-start">
					{projects.map((project) => {
						return (
							<Grid item key={project.id} xs={12} sm={6} md={3}>
								<NavLink className={classes.noUnderline} to={`/${authId}/projects/${project.id}`}>
									<Card className={classes.card} variant="outlined">
										<CardContent className={classes.cards}>
											<Typography className={classes.title}>{project.projectName}</Typography>
											<Typography component="p" variant="body2">
												{project.projectDescription}
											</Typography>

											<Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
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
