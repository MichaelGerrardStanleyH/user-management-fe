import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./HeaderMain.css";

export default function HeaderMain(props) {
  return (
    <>
      <div className="navbar">
        <Container>
          <Navbar>
            <Container>
              <Navbar.Brand>User Management</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                  className="ms-auto rounded-1"
                  style={{ backgroundColor: "#ee7155" }}
                >
                  <Nav.Link href="/">Log out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </div>
    </>
  );
}
