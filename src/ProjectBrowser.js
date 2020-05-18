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
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
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
		// eslint-disable-next-line
		[ authToken, projects.length ]
	);

	useEffect(() => {
		document.title = 'CookCamp - Projects';
	}, []);

	const classes = useStyles();

	return (
		<main>
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
					<Typography variant="h4">Projects</Typography>
					<div />
				</section>

				<Grid container spacing={2} direction="row" justify="center" alignItems="flex-start">
					{projects.map((project) => {
						return (
							<Grid item key={project.id} xs={12} sm={6} md={4}>
								<NavLink className={classes.noUnderline} to={`/${authId}/projects/${project.id}`}>
									<Card className={classes.card} variant="outlined">
										<CardContent className={classes.cards}>
											<div>
												<Typography className={classes.title}>{project.projectName}</Typography>
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
		</main>
	);
};

export default ProjectBrowser;
