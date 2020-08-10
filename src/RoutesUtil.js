import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// function to create a route validator. if a route is private(based on App.js) then a user would need be redirected to the login page
const PrivateRoute = ({ path, component: Component, authToken, componentProps }) => (
	<Route
		path={path}
		render={(props) =>
			Boolean(authToken) === false ? <Redirect to="/login" /> : <Component {...props} {...componentProps} />}
	/>
);

export default PrivateRoute;
