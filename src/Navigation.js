import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		backgroundColor: 'inherit'
	},
	title: {
		flexGrow: 1
	},
	link: {
		color: 'blue',
		textDecoration: 'none'
	},
	ToolBar: {
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	home: {
		color: 'black',
		textDecoration: 'none',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	navbar: {
		backgroundColor: 'inherit'
	}
}));

const Navigation = (props) => {
	const { authToken, authId, logout, user, firstInitial, lastInitial } = useContext(CookContext);
	const [ auth, setAuth ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);
	const classes = useStyles();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogOut = () => {
		logout();
		setAuth(false);
		setAnchorEl(null);
		props.history.push('/');
	};

	useEffect(
		() => {
			if (authToken) {
				setAuth(true);
			}
		},
		[ authToken, logout ]
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar className={classes.navbar} color="inherit" position="static">
				<Toolbar className={classes.ToolBar}>
					<Button href="/">
						<Icon color="primary">
							<AccountTreeIcon />
						</Icon>
						<Typography variant="h6">CookCamp</Typography>
					</Button>
					{auth && (
						<Link className={classes.home} to={`/${authId}/projects`}>
							<HomeIcon />
							<div>Home</div>
						</Link>
					)}

					{auth ? (
						<div>
							{user.userName}
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={open}
								onClose={handleClose}
							>
								{/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
								<MenuItem onClick={handleLogOut}>Log Out</MenuItem>
							</Menu>
						</div>
					) : (
						<div>
							<Button color="inherit" href="/login" className={classes.link}>
								Login
							</Button>
							<Button color="inherit" href="/signup" className={classes.link}>
								Sign Up
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(Navigation);
