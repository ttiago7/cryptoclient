import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default function navbar() {
	//const dispatch = useDispatch();

	return (
		<>
			<Navbar bg='primary' variant='dark'>
				<Navbar.Brand href='#home'>Home</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link href='#features'>Create currency</Nav.Link>
					<Nav.Link href='#pricing'>Create rate</Nav.Link>
				</Nav>
				{/* <Form inline>
					<FormControl
						type='text'
						placeholder='Search'
						className='mr-sm-2'
					/>
					<Button variant='outline-light'>Search</Button>
				</Form> */}
			</Navbar>
		</>
	);
}
