import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

const Navigationbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['accessToken']);

  const toggle = () => setIsOpen(!isOpen);

  // const logOut = () => {
  //   alert("You will be logged out. Hope to see you soon again!");
  //   removeCookie('accessToken');
  // };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">We-Mentor</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/messages">Messages</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/logout" 
              // onClick={logOut}
              >Log out</NavLink>

            </NavItem>
          </Nav>
          <NavbarText>by NumeroUno</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
