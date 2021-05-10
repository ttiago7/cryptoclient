import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import generateStore from './redux/store.js';

import navbar from './components/navbar.jsx';
import CryptoScreen from './containers/CryptoScreen';
import FormNewCurrency from './components/FormNewCurrency.jsx';

export var store = null; // exporto el store para poder usarlo en util.js para dispatch action
function App() {
	store = generateStore();

	//para q todos estos componentes puedan leer el store debemos envolverlos con un provider
	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					{/* <Switch> */}
					<Route path='/' component={navbar} />
					<Route path='/' exact component={CryptoScreen} />
					<Route path='/new' component={FormNewCurrency} />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
