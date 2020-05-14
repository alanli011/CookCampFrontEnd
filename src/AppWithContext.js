import React, { useState, useEffect, useCallback } from 'react';
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
	const [ firstInitial, setFirstInitial ] = useState('');
	const [ lastInitial, setLastInitial ] = useState('');

	const login = (token, id) => {
		window.localStorage.setItem('state-cookcamp-token', token);
		window.localStorage.setItem('state-cookcamp-id', id);
		setNeedLogin(false);
		setAuthToken(token);
		setAuthId(id);
	};

	const logout = () => {
		window.localStorage.removeItem('state-cookcamp-token');
		window.localStorage.removeItem('state-cookcamp-id');
		setNeedLogin(true);
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

	useEffect(
		() => {
			if (authToken) {
				setNeedLogin(false);
			} else {
				setNeedLogin(true);
			}
		},
		[ authToken ]
	);

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
				needLogin,
				login,
				logout,
				user,
				projects,
				loadProjects,
				setProjects,
				firstInitial,
				lastInitial
			}}
		>
			<App />
		</CookContext.Provider>
	);
};

export default AppWithContext;
