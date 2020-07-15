import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CookContext from './CookContext';
import { baseUrl } from './config';
import Loading from './Loading';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		backgroundColor: 'white',
		marginTop: '20px',
		borderRadius: '4px',
		boxShadow: '1px 1px 5px lightgray, -1px -1px 5px lightgray',
		height: '100vh',
		overflowY: 'auto'
	},
	spacing: {
		padding: theme.spacing(6)
	},
	delete: {
		color: 'red',
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

const ToDoItem = () => {
	const { singleToDo: toDo, loadSingleToDo, loadSingleToDoItem, singleToDoItem, setSingleToDoItem } = useContext(
		CookContext
	);
	const [ checked, setChecked ] = useState(null);
	const [ open, setOpen ] = useState(false);
	const [ itemName, setItemName ] = useState('');
	const [ loaded, setLoaded ] = useState(false);
	const { id, toDoId } = useParams();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleItemNameChange = (e) => {
		setItemName(e.target.value);
	};

	const handleAddSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${baseUrl}/projects/${id}/to-do/item/${toDoId}`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: itemName,
					toDoId
				})
			});
			if (!res.ok) {
				throw res;
			}
			const { item } = await res.json();
			setSingleToDoItem([ ...singleToDoItem, item ]);
			setOpen(false);
			setItemName('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const res = await fetch(`${baseUrl}/projects/${id}/to-do/item/${toDoId}/${id}`, {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!res.ok) {
				throw res;
			}
			setSingleToDoItem([ ...singleToDoItem.filter((item) => item.id !== id) ]);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCheck = async (event, itemId) => {
		event.persist();
		try {
			const res = await fetch(`${baseUrl}/projects/${id}/to-do/item/${toDoId}/${itemId}`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					completed: event.target.checked
				})
			});
			if (!res.ok) {
				throw res;
			}
			const { item } = await res.json();
			console.log(item);
			console.log(event.target);
			setChecked({ ...checked, [event.target.name]: item.completed });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(
		() => {
			setTimeout(() => {
				setLoaded(true);
			}, 1000);
			if (!toDo) {
				loadSingleToDo(id, toDoId);
				loadSingleToDoItem(id, toDoId);
				setChecked(singleToDoItem.completed);
				console.log(singleToDoItem);
			} else if (toDo.id !== parseInt(toDoId, 10)) {
				loadSingleToDo(id, toDoId);
				loadSingleToDoItem(id, toDoId);
				setChecked(singleToDoItem.completed);
			} else {
				document.title = toDo.name;
			}
		},
		// eslint-disable-next-line
		[ toDo, id, singleToDoItem ]
	);

	const classes = useStyles();

	if (!toDo) return null;

	return (
		<Container maxWidth="md" className={classes.root}>
			{!loaded && <Loading />}
			{loaded && (
				<div className={classes.spacing}>
					<Typography className={classes.titleStyles} variant="h4">
						{toDo.name}
					</Typography>
					<Typography variant="body1">{toDo.description}</Typography>
					<Button variant="contained" color="primary" onClick={handleClickOpen}>
						<AddIcon />
						Add Item
					</Button>
					<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title">Add Item</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Add what you need to do this to do list to keep yourself on track!
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="item"
								label="Item"
								type="text"
								fullWidth
								value={itemName}
								onChange={handleItemNameChange}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" onClick={handleAddSubmit} color="primary">
								Add
							</Button>
						</DialogActions>
					</Dialog>
					{singleToDoItem &&
						singleToDoItem.map((item, i) => {
							return (
								<List key={i}>
									<ListItem id={item.id}>
										<Checkbox
											checked={checked}
											onChange={(e) => handleCheck(e, item.id)}
											name={item.name}
										/>
										<ListItemText primary={item.name} />
										<DeleteForeverIcon
											onClick={() => handleDelete(item.id)}
											className={classes.delete}
										/>
									</ListItem>
									<Divider />
								</List>
							);
						})}
				</div>
			)}
		</Container>
	);
};

export default ToDoItem;
