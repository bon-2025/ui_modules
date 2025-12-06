import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { navItems } from '../utils/navItems'; // import from utils
import './DynamicNavbar.css'; // import custom CSS for hover

const DynamicNavbar = ({ userRole }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="dynamic-navbar">
      <Container>
        <Navbar.Brand href="/">CMIS</Navbar.Brand>
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
                      href={subItem.link}
                      className="nav-hover"
                    >
                      {subItem.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link key={idx} href={item.link} className="nav-hover">
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
