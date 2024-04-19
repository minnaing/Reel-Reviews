import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

import ReelLogo from "../Partials/ReelLogo/ReelLogo";
import "./navbar-bar.css";

const NavbarBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

<<<<<<< HEAD
    return (
        <Navbar expand="lg" style={{ position: 'sticky', top: 0, zIndex: 1000 }} className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" href="#">
                    <ReelLogo />
                    Reel Reviews
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                    show={show}
                    onHide={handleClose}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            <Navbar.Brand as={Link} to="/" href="#">
                                <ReelLogo />
                                Reel Reviews
                            </Navbar.Brand>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={Link} to="/" onClick={handleClose}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/reviews" onClick={handleClose}>
                                Reviews
                            </Nav.Link>
                            <Nav.Link as={Link} to="/geo-loc" onClick={handleClose}>
                                Geo Location
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
=======
  return (
    <Navbar
      expand="lg"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
      className="bg-body-tertiary mb-3"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" href="#">
          <ReelLogo />
          Reel Reviews
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <Navbar.Brand as={Link} to="/" href="#">
                <ReelLogo />
                Reel Reviews
              </Navbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" onClick={handleClose}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/reviews" onClick={handleClose}>
                Reviews
              </Nav.Link>
              <Nav.Link as={Link} to="/region_reviews" onClick={handleClose}>
                Region_Reviews
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
>>>>>>> origin/main
};

export default NavbarBar;
