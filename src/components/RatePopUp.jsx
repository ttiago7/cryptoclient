import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { postRate, getLastRates } from '../redux/rateDucks';
import { useForm } from 'react-hook-form';

const RatePopUp = (props) => {
	console.log('4 - rate pop up component');
	const dispatch = useDispatch();

	const [show, setShow] = useState(true);
	const close = () => {
		props.onChange(false);
		setShow(false);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data, e) => {
		data.id_currency = props.idCurrency;
		dispatch(postRate(data)).then((res) => {
			console.log(res);
			close();
		});
		e.target.reset(); // reset after form submit
	};

	return (
		<>
			<Modal show={show} onHide={close}>
				<Modal.Header>
					<Modal.Title>Upgrade rate to {props.symbol}</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<Form.Label>Value</Form.Label>

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

						{errors.value &&
							errors.value.type === 'positiveNumber' && (
								<span className='text-danger text-small d-block mb-2'>
									Your value is invalid
								</span>
							)}
						{errors.value &&
							errors.value.type === 'lessThanHundred' && (
								<span className='text-danger text-small d-block mb-2'>
									Your value should be greater than
									999999.999999
								</span>
							)}
					</Modal.Body>

					<Modal.Footer>
						<Button type='reset' variant='secondary'>
							Standard Reset Field Values
						</Button>
						<Button variant='secondary' onClick={close}>
							Close
						</Button>
						<Button type='submit' className='btn btn-primary'>
							Save
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
export default RatePopUp;
