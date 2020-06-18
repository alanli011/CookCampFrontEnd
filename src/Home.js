import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CookContext from './CookContext';
import homepageImage from './images/homepage-demo.png';
import staticImage from './images/CookCamp_Home.png';

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
	},
	homePageImageStyle: {
		marginTop: theme.spacing(8),
		maxWidth: '1300px'
	}
}));

const Home = () => {
	const { authToken, authId } = useContext(CookContext);
	useEffect(() => {
		document.title = 'CookCamp - Home';
	}, []);

	const classes = useStyles();

	if (authToken && authId) {
		return <Redirect to={`/${authId}/projects`} />;
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
				<img className={classes.homePageImageStyle} src={homepageImage} alt="demo" />
				<img className={classes.homePageImageStyle} src={staticImage} alt="static" />
			</div>
		</Container>
	);
};

export default Home;
