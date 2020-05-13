import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import CookContext from './CookContext';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center'
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
	}
}));

const Navigation = () => {
	const { authToken, logout, user } = useContext(CookContext);
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
		return <Redirect to="/" />;
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
			<AppBar color="inherit" position="static">
				<Toolbar className={classes.ToolBar}>
					<Button href="/">
						<Typography variant="h6">CookCamp</Typography>
					</Button>
					{auth && (
						<Link className={classes.home} to="/">
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
								<AccountCircle />
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
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleLogOut}>Log Out</MenuItem>
							</Menu>
						</div>
					) : (
						<div>
							<Button color="inherit">
								<NavLink className={classes.link} to="/login">
									Login
								</NavLink>
							</Button>
							<Button color="inherit">
								<NavLink className={classes.link} to="/signup">
									Sign Up
								</NavLink>
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navigation;
