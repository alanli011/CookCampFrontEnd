import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const App = (props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login} />
				<Route exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
