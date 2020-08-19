import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SideMenu() {
  return (
    <Nav className="flex-column mt-1">
      <Nav.Link as={Link} to="/materials">
        식재료
      </Nav.Link>
      <Nav.Link as={Link} to="/menu">
        식단
      </Nav.Link>
    </Nav>
  );
}
export default SideMenu;
