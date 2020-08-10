import React, { useState, useEffect } from 'react';
import App from './App';
import CookContext from './CookContext';
import { baseUrl } from './config';

const AppWithContext = () => {
	// grab the token and tokenid from the localstorage upon sucessful login/signup
	const localStorageToken = localStorage.getItem('state-cookcamp-token');
	const localStorageTokenId = localStorage.getItem('state-cookcamp-id');

	// setting default token and authId
	const [ authToken, setAuthToken ] = useState(localStorageToken);
	const [ authId, setAuthId ] = useState(localStorageTokenId);

	// state management for user
	const [ user, setUser ] = useState('');
	const [ firstInitial, setFirstInitial ] = useState('');
	const [ lastInitial, setLastInitial ] = useState('');

	// state management for projects
	const [ projects, setProjects ] = useState([]);
	const [ singleProject, setSingleProject ] = useState(null);

	// state management for the messages/notes
	const [ messages, setMessages ] = useState([]);
	const [ singleMessage, setSingleMessage ] = useState(null);

	// state management for comments
	const [ comments, setComments ] = useState([]);
	const [ singleComment, setSingleComment ] = useState(null);

	// state management for toDos
	const [ toDos, setToDos ] = useState([]);
	const [ singleToDo, setSingleToDo ] = useState(null);

	// state management for toDoitem
	const [ toDoItem, setToDoItem ] = useState([]);
	const [ singleToDoItem, setSingleToDoItem ] = useState([]);

	// state management for a list of to do items
	const [ toDoItemList, setToDoItemList ] = useState({});

	// function to handle the login and provides the context for the rest of the application
	const login = (token, id) => {
		window.localStorage.setItem('state-cookcamp-token', token);
		window.localStorage.setItem('state-cookcamp-id', id);
		setAuthId(id);
		setAuthToken(token);
	};

	// function to handle the logout by removing from localstorage and setting the state back to null
	const logout = () => {
		window.localStorage.removeItem('state-cookcamp-token');
		window.localStorage.removeItem('state-cookcamp-id');
		setAuthToken(null);
		setAuthId(null);
	};

	// async function to handle get all the projects for a specific user and setting the project state
	const loadProjects = async () => {
		try {
			if (!authId) return;
			const res = await fetch(`${baseUrl}/users/${authId}/projects`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			if (!res.ok) {
				throw res;
			}

			const { projects } = await res.json();
			setProjects(projects.Projects);
		} catch (err) {
			console.error(err);
		}
	};

	// async function to handle get one specific project for that one user and setting the state of a single project
	const loadOneProject = async (id) => {
		try {
			const res = await fetch(`${baseUrl}/projects/${id}`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			if (!res.ok) {
				throw res;
			}
			const { project } = await res.json();
			setSingleProject(project);
		} catch (err) {
			console.error(err);
		}
	};

	// async function to handle getting all the messages/notes for the specific project and user
	const loadProjectMessages = async (id) => {
		try {
			if (!authId) return;
			const res = await fetch(`${baseUrl}/projects/${id}/messages`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});

			if (!res.ok) {
				throw res;
			}

			const { messages } = await res.json();
			setMessages(messages);
		} catch (err) {
			console.error(err);
		}
	};

	// async function to handle getting one message/note for the specific project and user
	const loadOneProjectMessage = async (id) => {
		try {
			const res = await fetch(`${baseUrl}/projects/:id/messages/${id}`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			if (!res.ok) {
				throw res;
			}
			const { message } = await res.json();
			setSingleMessage(message);
		} catch (err) {
			console.error(err);
		}
	};

	// async function that handles getting all the comments for that one messageboard/noteboard
	const loadMessageComments = async (projectId, messageId) => {
		try {
			const res = await fetch(`${baseUrl}/projects/${projectId}/messages/${messageId}/comments`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			if (!res.ok) {
				throw res;
			}
			const { comments } = await res.json();
			setComments(comments);
		} catch (error) {
			console.error(error);
		}
	};

	// async function to get all the ToDos and set the state
	const loadProjectToDos = async (id) => {
		try {
			if (!authId) return;
			const res = await fetch(`${baseUrl}/projects/${id}/to-do`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});

			if (!res.ok) {
				throw res;
			}

			const { toDos } = await res.json();
			setToDos(toDos);
		} catch (err) {
			console.error(err);
		}
	};

	// async function to the to do list and set the state with the object returned
	const loadSingleToDo = async (id, toDoId) => {
		try {
			const res = await fetch(`${baseUrl}/projects/${id}/to-do/${toDoId}`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			if (!res.ok) {
				throw res;
			}
			const { toDo } = await res.json();
			setSingleToDo(toDo);
		} catch (err) {
			console.error(err);
		}
	};

	// aync function get all the items and set the state. should return an array
	const loadToDoItems = async (id) => {
		try {
			if (!authId) return;
			const res = await fetch(`${baseUrl}/projects/${id}/to-do/item`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});

			if (!res.ok) {
				throw res;
			}

			const { item } = await res.json();
			setToDoItem(item);
		} catch (err) {
			console.error(err);
		}
	};

	//
	const loadSingleToDoItem = async (id, toDoId) => {
		try {
			if (!authId) return;
			const res = await fetch(`${baseUrl}/projects/${id}/to-do/item/${toDoId}`, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});

			if (!res.ok) {
				throw res;
			}

			const { item } = await res.json();
			setSingleToDoItem(item);
		} catch (err) {
			console.error(err);
		}
	};

	const loadToDoItem = async (id, toDoId, itemId) => {
		try {
			if (!authId) return;
			const res = await fetch(`${baseUrl}/projects/${id}/to-do/item/${toDoId}/${itemId}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!res.ok) {
				throw res;
			}
			const { item } = await res.json();
			setToDoItemList(item);
		} catch (err) {
			console.error(err);
		}
	};

	// this useEffect will set the user for the whole application. it'll also set the initials
	useEffect(
		() => {
			if (authId) {
				const getUser = async () => {
					const res = await fetch(`${baseUrl}/users/${authId}`, {
						headers: {
							Authorization: `Bearer ${authToken}`
						}
					});

					if (!res.ok) {
						throw res;
					}

					const { user } = await res.json();
					setUser(user);
					setFirstInitial(user.firstName.slice(0, 1));
					setLastInitial(user.lastName.slice(0, 1));
				};
				getUser();
			}
		},
		[ authToken, authId ]
	);

	// this large return will provide the value(context) to the rest of the application to use
	return (
		<CookContext.Provider
			value={{
				authToken,
				authId,
				login,
				logout,
				user,
				setProjects,
				projects,
				loadProjects,
				singleProject,
				loadOneProject,
				firstInitial,
				lastInitial,
				loadProjectMessages,
				messages,
				setMessages,
				singleMessage,
				loadOneProjectMessage,
				loadProjectToDos,
				toDos,
				setToDos,
				singleToDo,
				loadSingleToDo,
				toDoItem,
				loadToDoItems,
				singleToDoItem,
				setSingleToDoItem,
				loadSingleToDoItem,
				comments,
				setComments,
				loadMessageComments,
				singleComment,
				setSingleComment,
				loadToDoItem,
				toDoItemList,
				setToDoItemList
			}}
		>
			<App />
		</CookContext.Provider>
	);
};

export default AppWithContext;
