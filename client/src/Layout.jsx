import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";

import Container from 'react-bootstrap/Container';

export function Layout({ connectionStatus, theme, toggleTheme }) {
    return (
        <Container fluid className="gx-0">
            <Navigation connectionStatus={connectionStatus} theme={theme} toggleTheme={toggleTheme} />
            <Container>
                <Outlet/>
            </Container>
        </Container>
    )
}