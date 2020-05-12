import React, { useState } from 'react';
import App from './App';
import CookContext from './CookContext';
import { baseUrl } from './config';

const AppWithContext = () => {
	const localStorageToken = localStorage.getItem('state-cookcamp-token');
	const localStorageTokenId = localStorage.getItem('state-cookcamp-id');

	const [ authToken, setAuthToken ] = useState(localStorageToken);
	const [ authId, setAuthId ] = useState(localStorageTokenId);
	const [ needLogin, setNeedLogin ] = useState(!!localStorageToken);

	const login = (token, id) => {
		window.localStorage.setItem('state-cookcamp-token', token);
		window.localStorage.setItem('state-cookcamp-id', id);
		setAuthToken(token);
		setAuthId(id);
		setNeedLogin(false);
	};

	return (
		<CookContext.Provider value={{ authToken, authId, needLogin, login }}>
			<App />
		</CookContext.Provider>
	);
};

export default AppWithContext;
