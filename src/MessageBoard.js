import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
		maxWidth: '800px',
		backgroundColor: 'white',
		marginTop: '20px',
		borderRadius: '4px',
		boxShadow: '2px 2px 1px lightgray;'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottom: '2px solid gray',
		padding: '15px 0'
	},
	noUnderline: {
		textDecoration: 'none'
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
	}
}));

const MessageBoard = () => {
	const { authId } = useContext(CookContext);
	const { id } = useParams();

	const classes = useStyles();

	return (
		<main>
			<Container className={classes.root}>
				<section className={classes.header}>
					<Link to={`/${authId}/projects/${id}/messsage_board/message/new`} className={classes.noUnderline}>
						<Button type="button" size="small" variant="contained" className={classes.newMessageButton}>
							<AddIcon className={classes.addIconStyle} />
							New Message
						</Button>
					</Link>
					<Typography variant="h4">Message Board</Typography>
					<Box className={classes.boxStyle}>
						<Typography>All Messages</Typography>
					</Box>
				</section>
			</Container>
		</main>
	);
};

export default MessageBoard;
