import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import moment from 'moment';

import GraphicPopUp from './GraphicPopUp';
import RatePopUp from './RatePopUp';
import bitcoin from '../images/bitcoin.jpg';
import ethereum from '../images/ethereum.jpg';
import cardano from '../images/cardano.jpg';
import monedas from '../images/monedas.jpg';

export default function CryptoCard({ rate }) {
	//const dispatch = useDispatch();

	var [login, setLogin] = useState(false);
	var [quantit, setQuantit] = useState(0);
	const changeStateLogin = (q) => {
		setLogin(true);
		setQuantit(q);
	};

	var [upgrade, setUpgrade] = useState(false);
	const changeStateUpgrade = () => {
		setUpgrade(true);
	};

	const switchImg = () => {
		switch (rate.description) {
			case 'bitcoin':
				return bitcoin;
			case 'ethereum':
				return ethereum;
			case 'cardano':
				return cardano;
			default:
				return monedas;
		}
	};

	return (
		<>
			<div className='mx-4 my-4'>
				<Card style={{ width: '18rem' }} className='text-center'>
					<Card.Img
						variant='top'
						src={switchImg()}
						// src={
						// 	{
						// 		bitcoin: bitcoin,
						// 		ethereum: ethereum,
						// 		cardano: cardano,
						// 		default: monedas,
						// 	}[rate.description]
						// }
					/>
					{/* 100x180 */}
					<Card.Body>
						<Card.Title>
							$ {rate.value} ({rate.symbol})
						</Card.Title>

						<Card.Text>
							Current {rate.description} price, created at{' '}
							{/* {rate.created_at} */}
							{moment(rate.created_at).format(
								'DD MMMM yyyy HH:mm:ss'
							)}
						</Card.Text>
					</Card.Body>
					<ListGroup className='list-group-flush'>
						<ListGroupItem>
							<Card.Link href='#'>
								<Button
									id='c'
									onClick={() => {
										changeStateLogin(5);
									}}
									variant='link'
								>
									Graphic last 5 rates
								</Button>
							</Card.Link>
						</ListGroupItem>
						<ListGroupItem>
							<Card.Link href='#'>
								<Button
									id='t'
									onClick={() => {
										changeStateLogin(30);
									}}
									variant='link'
								>
									Graphic last 30 rates
								</Button>
							</Card.Link>
						</ListGroupItem>
						{login ? (
							<GraphicPopUp
								onChange={setLogin}
								idCurrency={rate.id_currency}
								quantity={quantit}
								symbol={rate.symbol}
							/>
						) : null}
					</ListGroup>
					<Card.Footer className='text-muted'>
						<Card.Link href='#'>
							<Button
								id='t'
								onClick={() => changeStateUpgrade()}
								variant='link'
							>
								Upgrade rate
							</Button>
						</Card.Link>
					</Card.Footer>
					{upgrade ? (
						<RatePopUp
							onChange={setUpgrade}
							idCurrency={rate.id_currency}
							symbol={rate.symbol}
						/>
					) : null}
				</Card>
			</div>
		</>
	);
}
