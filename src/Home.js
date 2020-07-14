import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CookContext from './CookContext';
import homepageImage from './images/homepage-demo.png';

const useStyles = makeStyles((theme) => ({
	paper: {
		// marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	title: {
		fontWeight: 'bold',
		fontSize: '3.5em',
		textAlign: 'center',
		color: 'white'
	},
	button: {
		width: '25%'
	},
	center: {
		display: 'flex',
		justifyContent: 'center'
	},
	homePageImageStyle: {
		margin: theme.spacing(6, 0),
		maxWidth: '100%'
	},
	home__background: {
		backgroundImage:
			"url('https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80')",
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: '100%'
	},
	callToAction: {
		backgroundColor: 'rgba(0,0,0, 0.4)',
		paddingBottom: theme.spacing(6)
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
		<div className={classes.home__background}>
			<Container component="main">
				<div className={classes.paper}>
					<div className={classes.callToAction}>
						<h1 className={classes.title}>The All-In-One Project Management Software For Cooking</h1>
						<div className={classes.center}>
							<Button className={classes.button} variant="contained" color="secondary" href="/signup">
								Try CookCamp Today!
							</Button>
						</div>
					</div>
					<img className={classes.homePageImageStyle} src={homepageImage} alt="demo" />
				</div>
			</Container>
		</div>
	);
};

export default Home;
