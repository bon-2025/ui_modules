import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { navItems } from '../config/navItems';
import './DynamicNavbar.css';

const DynamicNavbar = ({ userRole }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="dynamic-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">CMIS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems[userRole]?.map((item, idx) =>
              item.dropdown ? (
                <NavDropdown
                  key={idx}
                  title={item.name}
                  id={`nav-dropdown-${idx}`}
                  className="nav-hover"
                >
                  {item.dropdown.map((subItem, subIdx) => (
                    <NavDropdown.Item
                      key={subIdx}
                      as={Link}
                      to={subItem.link}
                      className="nav-hover"
                    >
                      {subItem.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link
                  key={idx}
                  as={Link}
                  to={item.link}
                  className="nav-hover"
                >
                  {item.name}
                </Nav.Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DynamicNavbar;
