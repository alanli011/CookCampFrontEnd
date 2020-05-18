import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		backgroundColor: 'white',
		marginTop: '20px',
		borderRadius: '4px',
		boxShadow: '1px 1px 5px lightgray, -1px -1px 5px lightgray',
		height: '100vh'
	}
}));

const ToDoItem = () => {
	const { singleToDo: toDo, loadSingleToDo } = useContext(CookContext);
	const { id } = useParams();
	console.log(id);
	console.log(toDo);

	useEffect(
		() => {
			if (!toDo) {
				loadSingleToDo(id);
			} else if (toDo.id !== parseInt(id, 10)) {
				loadSingleToDo(id);
			} else {
				document.title = toDo.name;
			}
		},
		// eslint-disable-next-line
		[ toDo, id ]
	);

	const classes = useStyles();

	if (!toDo) return null;

	return (
		<Container maxWidth="md" className={classes.root}>
			<div className={classes.spacing}>
				<Typography className={classes.titleStyles} variant="h4">
					{toDo}
				</Typography>
			</div>
		</Container>
	);
};

export default ToDoItem;
