import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Modal, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postRate } from '../redux/rateDucks';
import { postCurrency } from '../redux/currencyDucks.js';
import { useForm } from 'react-hook-form';

const FormNewCurrency = (props) => {
	console.log('5 - new currency component');
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data, e) => {
		//id_currency
		let currency = {
			symbol: data.symbol,
			description: data.description,
		};
		dispatch(postCurrency(currency)).then((res) => {
			console.log(res);
			let rate = {
				id_currency: res.id,
				value: data.value,
			};
			dispatch(postRate(rate));
			//redireccionar al home
		});
		e.target.reset(); // reset after form submit
	};

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<h2>Form to create a new currency</h2>
					<hr></hr>
					<input
						placeholder='Enter symbol (3 charts)'
						className='form-control mb-2'
						name='symbol'
						type='text'
						{...register('symbol', {
							required: {
								value: true,
								message: 'symbol is required',
							},
							maxLength: {
								value: 3,
								message: 'Max of 3 characters',
							},
							minLength: {
								value: 3,
								message: 'Min of 3 characters',
							},
						})}
					></input>

					<input
						placeholder='Enter description'
						className='form-control mb-2'
						name='description'
						type='text'
						{...register('description', {
							required: {
								value: true,
								message: 'description is required',
							},
							minLength: {
								value: 3,
								message: 'Min of 3 characters',
							},
						})}
					></input>

					<input
						placeholder='Enter the value'
						className='form-control mb-2'
						name='value'
						type='text'
						{...register('value', {
							required: {
								value: true,
								message: 'value is required',
							},
							maxLength: {
								value: 13,
								message: 'Max of 13 characters',
							},
							minLength: {
								value: 1,
								message: 'Min of 1 characters',
							},
							validate: {
								positiveNumber: (value) =>
									parseFloat(value) > 0,
								lessThanHundred: (value) =>
									parseFloat(value) < 999999,
							},
						})}
					></input>
					{errors.value && (
						<span className='text-danger text-small d-block mb-2'>
							{errors.value.message}
						</span>
					)}

					{errors.value && errors.value.type === 'positiveNumber' && (
						<span className='text-danger text-small d-block mb-2'>
							Your value is invalid
						</span>
					)}
					{errors.value &&
						errors.value.type === 'lessThanHundred' && (
							<span className='text-danger text-small d-block mb-2'>
								Your value should be greater than 999999.999999
							</span>
						)}
				</Modal.Body>

				<Modal.Footer>
					<Button type='reset' variant='secondary'>
						Standard Reset Field Values
					</Button>
					<Button type='submit' className='btn btn-primary'>
						Save
					</Button>
				</Modal.Footer>
			</Form>
		</>
	);
};
export default FormNewCurrency;
