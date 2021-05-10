import axios from 'axios';
import Swal from 'sweetalert2';

const dataInicial = {
	currency: {},
};

//CONSTANTES

const POST_CURRENCY = 'POST_CURRENCY';

export const postCurrency = (currency) => async (dispatch, getState) => {
	try {
		const res = await axios.post(
			'http://localhost:3001/currencies/',
			currency
		); //axios genera la respuesta en .data
		dispatch({
			type: POST_CURRENCY,
			payload: res.data.currency,
		});
		return res.data.currency;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

//REDUCER
export default function currencyReducer(state = dataInicial, action) {
	switch (action.type) {
		case POST_CURRENCY:
			return {
				...state,
				currency: action.payload,
			};
		default:
			return state;
	}
}
