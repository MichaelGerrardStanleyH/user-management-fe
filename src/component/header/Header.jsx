import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="navbar">
        <Container>
          <Navbar>
            <Container>
              <Navbar.Brand href="/">Danamas Insan Kreasi Andalan</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link href="signin">Sign In</Nav.Link>
                  <Nav.Link href="signup">Sign Up</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </div>
    </>
  );
}
