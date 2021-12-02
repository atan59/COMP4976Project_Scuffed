import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavbarLogo from '../../Assets/Images/NavbarLogo.png';
import classes from './NavbarComponent.module.css';

const NavbarComponent = (props) => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container className={classes.container}>
                    <img src={NavbarLogo} alt="Logo" />
                    <Nav className="me-auto">
                        <Navbar.Brand href="/home">Team Scuffed</Navbar.Brand>
                    </Nav>
                </Container>
                <div className={classes.flexEnd}>
                    <Nav.Link className={classes.welcomeUser}>Welcome, {props.name}</Nav.Link>
                    <Nav.Link className={classes.logoutButton} href="/" onClick={props.logout()}>Logout</Nav.Link>
                </div>
            </Navbar>
        </>
    )
}

export default NavbarComponent
