import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar bg="dark" variant="dark" expand="lg" className="layout-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="layout-content">
        <Outlet /> {/* This will render the current page's content */}
      </main>

      <footer className="layout-footer">© 2024 My Website</footer>
    </div>
  );
};

export default Layout;