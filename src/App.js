import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';

const App = (props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
