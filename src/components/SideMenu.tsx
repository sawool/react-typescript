import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SideMenu() {
  return (
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/materials">
        식재료
      </Nav.Link>
    </Nav>
  );
}
export default SideMenu;
