import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ path, component: Component, authToken, componentProps }) => (
	<Route
		path={path}
		render={(props) =>
			Boolean(authToken) === false ? <Redirect to="/login" /> : <Component {...props} {...componentProps} />}
	/>
);

export default PrivateRoute;
