import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ path, component: Component, needLogin, componentProps }) => (
	<Route
		path={path}
		render={(props) =>
			needLogin === true ? <Redirect to="/login" /> : <Component {...props} {...componentProps} />}
	/>
);

export default PrivateRoute;
