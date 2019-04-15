import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Nav>
          <NavItem>
            <NavLink href="#">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Inventory</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Contacts</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
