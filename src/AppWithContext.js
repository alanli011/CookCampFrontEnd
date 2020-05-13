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
	const [ projects, setProjects ] = useState([]);
	const [ needLogin, setNeedLogin ] = useState(!!localStorageToken);

	const login = (token, id) => {
		window.localStorage.setItem('state-cookcamp-token', token);
		window.localStorage.setItem('state-cookcamp-id', id);
		setAuthToken(token);
		setAuthId(id);
		setNeedLogin(false);
	};

	const logout = () => {
		window.localStorage.removeItem('state-cookcamp-token');
		window.localStorage.removeItem('state-cookcamp-id');
		setAuthToken(null);
		setAuthId(null);
		setNeedLogin(true);
	};

	const loadProjects = async () => {
		const res = await fetch(`${baseUrl}/projects`, {
			headers: {
				Authorization: `Bearer ${authToken}`
			}
		});
		if (!res.ok) {
			throw res;
		}

		const { projects } = await res.json();
		setProjects(projects);
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
				};
				getUser();
			}
		},
		[ authToken, authId ]
	);

	return (
		<CookContext.Provider value={{ authToken, authId, needLogin, login, logout, user, projects, loadProjects }}>
			<App />
		</CookContext.Provider>
	);
};

export default AppWithContext;
