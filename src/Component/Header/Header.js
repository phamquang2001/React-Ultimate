import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Header.scss'

function Header() {

  const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="/">React</Navbar.Brand> */}
        <NavLink to='/' className="navbar-brand">React</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className="nav-link">Home</NavLink>
            <NavLink to='/user' className="nav-link">User</NavLink>
            <NavLink to='/admin' className="nav-link">Admin</NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={(() => navigate("/login"))}>Log in</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Log out
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
