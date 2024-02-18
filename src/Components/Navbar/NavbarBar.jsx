// IMPORT BROWSERROUTER, ROUTES, AND ROUTE FROM REACT-ROUTER-DOM FOR ROUTING
import { Link } from "react-router-dom";

// IMPORT { Container, Nav, Navbar } COMPONENT FROM REACT-BOOTSTRAP FOR NAVIGATION HEADER/LINKS
import { Container, Nav, Navbar } from "react-bootstrap";

import "./navbar-bar.css"

// CREATE NAVBAR COMPONENT
const NavbarBar = () => {

  // RETURN NAVBAR COMPONENT
  return (
      
      <Navbar bg="dark" expand="lg" variant="dark">
      {/* // RENDER NAVBAR WITH DARK THEME AND CONTAINER TO ALIGN NAV ITEMS */}

        <Container>
          
          {/* // BRAND NAME OR LOGO IN THE NAVBAR */}
          <Navbar.Brand as={Link} to="/">
            
            Reel Reviews
          </Navbar.Brand>

          {/* // TOGGLE BUTTON FOR COLLAPSIBLE NAVBAR IN SMALLER SCREENS */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* // COLLAPSIBLE NAVBAR CONTENT CONTAINING NAV LINKS */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              
              {/* // NAVIGATION LINKS */}
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/reviews">
                Reviews
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavbarBar;
