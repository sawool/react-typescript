import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SideMenu() {
  return (
    <Nav className="flex-column">
      <Nav.Link>
        <Link to="/material">식재료</Link>
      </Nav.Link>
    </Nav>
  );
}
export default SideMenu;
