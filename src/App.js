import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import ProjectBrowser from './ProjectBrowser';
import ProjectDetail from './ProjectDetail';

const App = (props) => {
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route path="/projects/:id" component={ProjectDetail} />
				<Route path="/projects" component={ProjectBrowser} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
