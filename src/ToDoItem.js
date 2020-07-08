import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CookContext from './CookContext';
import { baseUrl } from './config';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Checkbox from '@material-ui/core/Checkbox';
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
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
	// const [ checked, setChecked ] = React.useState(false);
	const [ open, setOpen ] = useState(false);
	const [ itemName, setItemName ] = useState('');
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

	// const handleDelete = async (e) => {
	// 	try {
	// 		const res = await fetch(`${baseUrl}/projects/${id}/to-do/item/$${toDoId}/${e.target.id}`, {
	// 			method: 'delete',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		});
	// 		console.log(res);
	// 		console.log(e.target.id);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// const handleChange = (event) => {
	// 	setChecked(event.currentTarget.checked);
	// };

	useEffect(
		() => {
			if (!toDo) {
				loadSingleToDo(id, toDoId);
				loadSingleToDoItem(id, toDoId);
			} else if (toDo.id !== parseInt(toDoId, 10)) {
				loadSingleToDo(id, toDoId);
				loadSingleToDoItem(id, toDoId);
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
					singleToDoItem.map((item) => {
						return (
							<List key={item.id}>
								<ListItem>
									{/* <Checkbox checked={checked} onChange={handleChange} /> */}
									<ListItemText primary={item.name} />
									{/* <DeleteForeverIcon onClick={handleDelete} className={classes.delete} /> */}
								</ListItem>
							</List>
						);
					})}
			</div>
		</Container>
	);
};

export default ToDoItem;
