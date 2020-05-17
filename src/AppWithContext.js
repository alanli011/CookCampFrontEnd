import React, { useState, useEffect } from 'react';
import App from './App';
import CookContext from './CookContext';
import { baseUrl } from './config';

const AppWithContext = () => {
	const localStorageToken = localStorage.getItem('state-cookcamp-token');
	const localStorageTokenId = localStorage.getItem('state-cookcamp-id');

	const [ authToken, setAuthToken ] = useState(localStorageToken);
	const [ authId, setAuthId ] = useState(localStorageTokenId);

	const [ user, setUser ] = useState('');
	const [ firstInitial, setFirstInitial ] = useState('');
	const [ lastInitial, setLastInitial ] = useState('');

	const [ projects, setProjects ] = useState([]);
	const [ singleProject, setSingleProject ] = useState(null);

	const [ messages, setMessages ] = useState([]);

	const [ toDos, setToDos ] = useState([]);

	const login = (token, id) => {
		window.localStorage.setItem('state-cookcamp-token', token);
		window.localStorage.setItem('state-cookcamp-id', id);
		setAuthId(id);
		setAuthToken(token);
	};

	const logout = () => {
		window.localStorage.removeItem('state-cookcamp-token');
		window.localStorage.removeItem('state-cookcamp-id');
		setAuthToken(null);
		setAuthId(null);
	};

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
				loadProjectToDos,
				toDos
			}}
		>
			<App />
		</CookContext.Provider>
	);
};

export default AppWithContext;
