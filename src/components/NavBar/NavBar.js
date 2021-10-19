import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand style={{color:'white', fontWeight:'500'}} href="/home">Form Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="mx-3" style={{color:'white', fontWeight:'500'}} href="/home">Home</Nav.Link>
                        <Nav.Link className="mx-3" style={{color:'white', fontWeight:'500'}} href="/form">Generate Form</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;