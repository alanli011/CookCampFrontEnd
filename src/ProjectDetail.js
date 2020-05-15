import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
	}
}));

const ProjectDetail = (props) => {
	const { loadOneProject, singleProject: project } = useContext(CookContext);
	const { id } = useParams();

	useEffect(
		() => {
			if (!project) {
				loadOneProject(id);
			} else if (project.id !== parseInt(id, 10)) {
				loadOneProject(id);
			} else {
				document.title = project.projectName;
			}
		},
		[ loadOneProject, id, project ]
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
						<Card>
							<CardContent>
								<Typography className={classes.cardTextStyles} align="center" variant="h6">
									Message Board
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6}>
						<Card>
							<CardContent>
								<Typography className={classes.cardTextStyles} align="center" variant="h6">
									To Do
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
};

export default ProjectDetail;
