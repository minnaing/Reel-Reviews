import { useState } from "react";

// IMPORT Link FROM REACT-ROUTER-DOM FOR ROUTING
import { Link } from "react-router-dom";

// IMPORT { Container, Nav, Navbar } COMPONENT FROM REACT-BOOTSTRAP FOR NAVIGATION HEADER/LINKS
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

import ReelLogo from "../Partials/ReelLogo";

import "./navbar-bar.css";

// CREATE NAVBAR COMPONENT
const NavbarBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // RETURN NAVBAR COMPONENT
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="#">
          <ReelLogo />
          Reel Reviews
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <Navbar.Brand href="#">
                <ReelLogo />
                Reel Reviews
              </Navbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* NAVIGATION LINKS */}
              <Nav.Link as={Link} to="/" onClick={handleClose}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/reviews" onClick={handleClose}>
                Reviews
              </Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={handleClose}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleClose}>
                Contact
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarBar;
