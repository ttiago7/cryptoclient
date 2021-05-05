import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

// //applyMiddleware es para trabajar con las promesas
import thunk from 'redux-thunk';
// //thunk es para hacer promesas con redux, configuraciones

//siempre en el stpre llamamos a los reducers (todos) (archivos categoryDucks... etc)
import currencyReducer from './currencyDucks';
import rateReducer from './rateDucks';

//conbinar los reducers que llamamos arriba
const rootReducer = combineReducers({
	currency: currencyReducer, //el nombre es el que vamos a consumir en el componente
	rate: rateReducer, //otro reducer
});

// esta constante pregunta si tenemos la extencion, sino usamos el compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
	//configuramos nuestra middleware,pasando el roorReducer y la extension
	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
}
