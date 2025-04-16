import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="layout-container">
      <Navbar bg="dark" variant="dark" expand="lg" className="layout-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">dashboard</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/chart">Charts</Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
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