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
		maxWidth: '800px'
	},
	centered: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center'
	}
}));

const ProjectDetail = (props) => {
	const { loadOneProject, singleProject: project } = useContext(CookContext);
	const { id } = useParams();
	console.log(id);

	useEffect(
		() => {
			if (!project) {
				loadOneProject(id);
			} else if (project.id !== parseInt(id, 10)) {
				loadOneProject(id);
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
					<h1>{project.projectName}</h1>
				</section>
			</Container>
		</main>
	);
};

export default ProjectDetail;
