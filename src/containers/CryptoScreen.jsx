import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getLastRates } from '../redux/rateDucks.js'; // obtenemos la accion obtenerCategoriasAccion exportada en ../redux/categoryDucks.js
import CryptoCard from '../components/CryptoCard.jsx';

export default function CryptoScreen() {
	const dispatch = useDispatch(); // ahora con dispatch podemos ejecutar nuestras acciones

	const ra = useSelector((store) => store.rate.rates); //devuelve el store, uso categorys x q asi lo llame en el store, .array nos trae el array q tenemos dentro

	console.log('1 - crypto screen container');
	useEffect(() => {
		dispatch(getLastRates());
	}, []);

	return ra ? (
		<div className='d-flex justify-content-around'>
			{/* <div className='col-md-6 mx-auto'> */}
			<div className='row'>
				{/* <div className='mx-4 my-4'> */}
				{ra.map((r) => {
					return <CryptoCard rate={r} key={r.id} />;
				})}
				{/* </div> */}
			</div>
		</div>
	) : (
		<h1>No existen cotizaciones</h1>
	);
}
