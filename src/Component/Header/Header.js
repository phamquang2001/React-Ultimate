import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { CHECK_LOG_OUT } from "../redux/action/userAction";

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthen);
  const dispatch = useDispatch()
  const handleLogout = async () => {
     localStorage.removeItem("persist:root");
     await dispatch(CHECK_LOG_OUT())
    // navigate("/")
  }

  console.log({isAuthenticated})
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="/">React</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand">
          React
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/user" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login-header" onClick={() => navigate("/login")}>Log in</button>
                <button className="btn-registry-header" onClick={() => navigate("/sign-up")}>Registry</button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={handleLogout}
                >
                  Log out
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
