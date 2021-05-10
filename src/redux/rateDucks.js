import axios from 'axios';
import Swal from 'sweetalert2';

const dataInicial = {
	rates: [],
	ratesQuantity: [],
};

//CONSTANTES

const GET_RATES = 'GET_RATES';
const GET_RATES_QUANITY = 'GET_RATES_QUANITY';
const POST_RATE = 'POST_RATE';

export const postRate = (newRate) => async (dispatch, getState) => {
	try {
		const res = await axios.post('http://localhost:3001/rates/', newRate); //axios genera la respuesta en .data
		dispatch({
			type: POST_RATE,
			payload: res.data.rate,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Upgrade rate correctly',
			showConfirmButton: false,
			timer: 1000,
		});
		return res;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getLastRatesQuantity = (id, Qua) => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get(`http://localhost:3001/rates/${id}/${Qua}`); //axios genera la respuesta en .data

		dispatch({
			type: GET_RATES_QUANITY,
			payload: res.data.rates,
		});
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getLastRates = () => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get('http://localhost:3001/rates/'); //axios genera la respuesta en .data

		dispatch({
			type: GET_RATES,
			payload: res.data.rates,
		});
	} catch (error) {
		console.log('Error: ' + error);
	}
};

//REDUCER
export default function rateReducer(state = dataInicial, action) {
	switch (action.type) {
		case GET_RATES:
			return {
				...state,
				rates: action.payload,
			};
		case GET_RATES_QUANITY:
			return {
				...state,
				ratesQuantity: action.payload,
			};
		case POST_RATE:
			console.log(state.rates);
			let newRate = action.payload;
			let index = state.rates.findIndex(
				(x) => x.id_currency === newRate.id_currency
			); // posicion del items a modificar

			state.rates[index] = {
				...state.rates[index],
				id: newRate.id,
				value: newRate.value,
				created_at: newRate.createdAt,
			};

			return {
				...state,
				rates: state.rates,
			};
		default:
			return state;
	}
}
