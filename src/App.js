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
import MessageBoard from './MessageBoard';
import MessageDetail from './MessageDetail';
import ToDoList from './ToDoList';
import NewMessage from './NewMessage';
import ToDoItem from './ToDoItem';
import NewToDoList from './NewToDoList';
import Footer from './Footer';

const App = (props) => {
	const { authId, authToken } = useContext(CookContext);
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<PrivateRoute exact path={`/${authId}/projects/:id/to_do`} component={ToDoList} authToken={authToken} />
				<PrivateRoute
					exact
					path={`/${authId}/projects/:id/to_do/new`}
					component={NewToDoList}
					authToken={authToken}
				/>
				<PrivateRoute
					exact
					path={`/${authId}/projects/:id/to_do/:id`}
					component={ToDoItem}
					authToken={authToken}
				/>
				<PrivateRoute
					exact
					path={`/${authId}/projects/:id/message_board/message/:id`}
					component={MessageDetail}
					authToken={authToken}
				/>
				<PrivateRoute
					exact
					path={`/${authId}/projects/:id/message_board`}
					component={MessageBoard}
					authToken={authToken}
				/>
				<PrivateRoute
					exact
					path={`/${authId}/projects/:id/messsage_board/message/new`}
					component={NewMessage}
					authToken={authToken}
				/>
				<PrivateRoute
					exact
					path={`/${authId}/projects/create-new`}
					component={NewProject}
					authToken={authToken}
				/>
				<PrivateRoute exact path={`/${authId}/projects/:id`} component={ProjectDetail} authToken={authToken} />
				<PrivateRoute exact path={`/${authId}/projects`} component={ProjectBrowser} authToken={authToken} />
				<Route path="/signup" component={SignUp} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/" component={Home} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
