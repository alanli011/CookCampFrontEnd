import React, { useState } from 'react';
import App from './App';
import CookContext from './CookContext';
import { baseUrl } from './config';

const AppWithContext = () => {
	const localStorageToken = localStorage.getItem('state-cookcamp-token');

	const [ authToken, setAuthToken ] = useState(localStorageToken);
	const [ needLogin, setNeedLogin ] = useState(!!localStorageToken);

	const login = (token) => {
		window.localStorage.setItem('state-cookcamp-token', token);
		setAuthToken(token);
		setNeedLogin(false);
	};

	return (
		<CookContext.Provider value={{ authToken, needLogin, login }}>
			<App />
		</CookContext.Provider>
	);
};

export default AppWithContext;
