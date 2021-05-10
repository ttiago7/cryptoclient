import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

export default function navbar() {
	return (
		<>
			<Navbar bg='primary' variant='dark'>
				<Navbar.Brand href='/'>Home</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link href='http://localhost:3000/new'>
						Create currency
					</Nav.Link>
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
