import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

// function to render material ui loading icon
function Loading(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
}

export default Loading;
