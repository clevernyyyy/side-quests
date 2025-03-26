import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

import './Navigation.css';


export function Navigation({ connectionStatus, theme, toggleTheme }) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            {/* <Navbar.Brand href="#/">React-Bootstrap</Navbar.Brand> */}
            <Navbar.Brand href="#">
            {theme === "dark" ? (
                <img
                    src='static/images/k25-white.png'
                    // width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Kernelcon 2025"
                />
            ) : (
                <img
                    src='static/images/k25-black.png'
                    // width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Kernelcon 2025"
                />
            )}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" exact>Home</Nav.Link>
                    <Nav.Link as={Link} to="/nope" exact>DoesntExist</Nav.Link>
                    <div className="vr my-2 mx-3 d-none d-lg-block"></div>
                    <hr className="mx-3 d-block d-lg-none"/>
                    {/* <Nav.Link href="https://badge.kernelcon.org/">Badge Website</Nav.Link> */}
                    <Navbar.Text>The WebSocket is currently: {connectionStatus}</Navbar.Text>
                </Nav>
                <Form className="justify-content-end">
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        // label="Dark Mode"
                        onChange={toggleTheme}
                        checked={theme === "dark"}
                    />
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}