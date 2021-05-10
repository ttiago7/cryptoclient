import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { getLastRatesQuantity } from '../redux/rateDucks';
import moment from 'moment';

const GraphicPopUp = (props) => {
	console.log('3 - graphic pop up component');
	const dispatch = useDispatch();

	const rates = useSelector((store) => store.rate.ratesQuantity);

	const [show, setShow] = useState(true);
	const close = () => {
		props.onChange(false);
		setShow(false);
	};

	useEffect(() => {
		dispatch(getLastRatesQuantity(props.idCurrency, props.quantity));
	}, []);

	const data = {
		//labels: ['dia 1', 'dia 2', 'dia 3', 'dia 4', 'dia 5', 'dia 6'],
		labels: rates.map((a) => {
			return moment(a.createdAt).format('DD-MM-yyyy HH:mm:ss');
		}),
		datasets: [
			{
				label: 'rates',
				//data: [12, 19, 3, 5, 2, 3],
				data: rates.map((a) => a.value),
				fill: false,
				backgroundColor: 'rgb(17, 168, 13)',
				borderColor: 'rgba(17, 168, 13, 0.3)',
			},
		],
	};

	const options = {
		maintainAspectRatio: true,
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
		legend: {
			labels: {
				fontSize: 25,
			},
		},
	};

	return (
		<>
			<Modal show={show} onHide={close}>
				<Modal.Header>
					<Modal.Title>Graphic {props.symbol}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Label>
						Graphic of evolution in last {rates.length} rates
					</Form.Label>
					<Line
						data={data}
						height={400}
						width={600}
						options={options}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary' onClick={close}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default GraphicPopUp;
