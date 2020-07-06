import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: theme.spacing(3, 2),
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	about: {
		// display: 'flex',
		// flexDirection: 'row',
		// justifyContent: 'space-between'
		textAlign: 'center'
	},
	developers: {
		marginLeft: 10
	},
	alignCenter: {
		textAlign: 'center'
	},
	githubColor: {
		color: '#000'
	}
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<footer className={classes.footer}>
				<Container maxWidth="lg" className={classes.content}>
					<div>
						<Typography variant="body1">Welcome to CookCamp</Typography>
						<Typography variant="body2" color="textSecondary">
							{'Copyright © '}
							{'CookCamp '}
							{new Date().getFullYear()}
							{'.'}
						</Typography>
					</div>
					<div className={classes.alignCenter}>
						<Typography variant="body1">About the Developer</Typography>
						<div className={classes.about}>
							<div>
								<Typography variant="subtitle1">Alan Li</Typography>
								<a
									href="https://www.linkedin.com/in/alan-li-730143133/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<LinkedInIcon color="primary" />
								</a>
								<a href="https://github.com/alanli011" target="_blank" rel="noopener noreferrer">
									<GitHubIcon className={classes.githubColor} />
								</a>
							</div>
						</div>
					</div>
				</Container>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
