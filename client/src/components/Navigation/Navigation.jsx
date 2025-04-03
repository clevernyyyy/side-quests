import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useAuthStore } from '../../store/authStore'

export function Navigation({ connectionStatus, theme, toggleTheme }) {
    const { isAuthenticated, user, logout } = useAuthStore()
    const navigate = useNavigate()
    
    const handleLogout = async () => {
        try {
          await logout()
          navigate('/login')
        } catch (error) {
          console.error(error)
        }
      }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="/">
            {theme === "dark" ? (
                <img
                    src='static/images/k25-white.png'
                    height="30"
                    className="d-inline-block align-top"
                    alt="Kernelcon 2025"
                />
            ) : (
                <img
                    src='static/images/k25-black.png'
                    height="30"
                    className="d-inline-block align-top"
                    alt="Kernelcon 2025"
                />
            )}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto justify-content-end" style={{ width: "100%" }}>
                    {isAuthenticated && user && <Navbar.Text>{`Welcome ${user.username}`}</Navbar.Text>}
                    {isAuthenticated && <div className="vr my-2 mx-3 d-none d-lg-block"></div>}
                    {isAuthenticated && <Nav.Link as={Link} onClick={handleLogout}>LogOut</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}