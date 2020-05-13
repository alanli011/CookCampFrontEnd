import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CookContext from './CookContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	title: {
		fontWeight: 'bold',
		fontSize: '3.5em',
		textAlign: 'center'
	},
	button: {
		width: '25%'
	},
	center: {
		display: 'flex',
		justifyContent: 'center'
	}
}));

const Home = () => {
	const { authToken } = useContext(CookContext);
	useEffect(() => {
		document.title = 'CookCamp - Home';
	}, []);

	const classes = useStyles();
	if (authToken) {
		return <Redirect to="/projects" />;
	}
	return (
		<Container component="main">
			<div className={classes.paper}>
				<h1 className={classes.title}>The All-In-One Project Management Software For Cooking</h1>
				<div className={classes.center}>
					<Button className={classes.button} variant="contained" color="secondary" href="/signup">
						Try CookCamp Today!
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default Home;
