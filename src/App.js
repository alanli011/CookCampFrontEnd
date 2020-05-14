import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import ProjectBrowser from './ProjectBrowser';
import ProjectDetail from './ProjectDetail';
import CookContext from './CookContext';
import PrivateRoute from './RoutesUtil';
import NewProject from './NewProject';

const App = (props) => {
	const { authId, needLogin } = useContext(CookContext);
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<PrivateRoute path={`/${authId}/projects/create-new`} component={NewProject} needLogin={needLogin} />
				<PrivateRoute path={`/${authId}/projects/:id`} component={ProjectDetail} needLogin={needLogin} />
				<PrivateRoute path={`/${authId}/projects`} component={ProjectBrowser} needLogin={needLogin} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
