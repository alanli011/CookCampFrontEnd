import React, { useEffect, useContext } from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		backgroundColor: 'white',
		marginTop: '20px',
		borderRadius: '4px',
		boxShadow: '1px 1px 5px lightgray, -1px -1px 5px lightgray',
		height: '100vh'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottom: '2px solid gray',
		padding: '15px 0'
	},
	noUnderline: {
		textDecoration: 'none',
		color: 'inherit'
	},
	newMessageButton: {
		backgroundColor: 'green',
		borderRadius: '30px',
		color: 'white'
	},
	addIconStyle: {
		color: 'white'
	},
	boxStyle: {
		border: '1px solid black',
		borderRadius: '30px',
		padding: '5px 10px',
		cursor: 'not-allowed'
	},
	cards: {
		height: '200px',
		boxShadow: '1px 1px 5px lightgray, -1px -1px 5px lightgray',
		marginTop: theme.spacing(2)
	},
	contentStyles: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	innerList: {
		display: 'flex',
		flexDirection: 'column'
	}
}));

const ToDoList = (props) => {
	const { authId, loadProjectToDos, toDos, singleProject: project } = useContext(CookContext);
	const [ checked, setChecked ] = React.useState(false);
	const { id } = useParams();

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	useEffect(
		() => {
			if (!project) {
				loadProjectToDos(id);
			} else if (project.id !== parseInt(id, 10)) {
				loadProjectToDos(id);
			} else {
				document.title = `${project.projectName} - To-dos`;
			}
		},
		// eslint-disable-next-line
		[ project, id ]
	);

	const classes = useStyles();

	return (
		<main>
			<Container maxWidth="md" className={classes.root}>
				<section className={classes.header}>
					<Link to={`/${authId}/projects/${id}/to_do/new`} className={classes.noUnderline}>
						<Button type="button" size="small" variant="contained" className={classes.newMessageButton}>
							<AddIcon className={classes.addIconStyle} />
							New List
						</Button>
					</Link>
					<Typography variant="h4">To-dos</Typography>
					<Box className={classes.boxStyle}>
						<Typography>All Lists</Typography>
					</Box>
				</section>
				<Grid container spacing={2} direction="row" justify="center" alignItems="center">
					{toDos.map((item) => {
						return (
							<Grid item key={item.id} xs={12} sm={6} md={4}>
								<Link className={classes.noUnderline} to={`/${authId}/projects/${id}/to_do/${item.id}`}>
									<Card className={classes.cards} variant="outlined">
										<CardContent className={classes.contentStyles}>
											<Typography gutterBottom variant="h5" component="h2">
												{item.name}
											</Typography>
											{item.ToDoItems &&
												item.ToDoItems.slice(0, 2).map((toDoItem) => {
													return (
														<List className={classes.innerList} key={toDoItem.id}>
															<ListItem>
																<Checkbox checked={checked} onChange={handleChange} />
																<ListItemText primary={toDoItem.name} />
															</ListItem>
														</List>
													);
												})}
										</CardContent>
									</Card>
								</Link>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</main>
	);
};

export default withRouter(ToDoList);
