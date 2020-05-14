import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import ProjectBrowser from './ProjectBrowser';
import ProjectDetail from './ProjectDetail';
import CookContext from './CookContext';

const PrivateRoute = ({ path, component: Component, needLogin, componentProps }) => (
	<Route
		path={path}
		render={(props) =>
			needLogin === true ? <Redirect to="/login" /> : <Component {...props} {...componentProps} />}
	/>
);

const App = (props) => {
	const { needLogin } = useContext(CookContext);
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<PrivateRoute path="/projects/:id" component={ProjectDetail} needLogin={needLogin} />
				<PrivateRoute path="/projects" component={ProjectBrowser} needLogin={needLogin} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
