import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink
      } from "reactstrap";

import 'react-icons';
import './NavBar.scss';
import { FaUserCircle } from "react-icons/fa";

function NavBar(){

    return(
        <div>
        <Navbar
          // color= 'primary'
          container="fluid"
          dark
          expand="md"
          fixed="top"
          full
          light
          className="Kooben-Navbar"
        >
        <NavbarBrand className = 'Kooben-Brand col-md-9 col-sm-10' href="/">
          K'óoben
        </NavbarBrand>
        <NavbarToggler className="NavBarToggler col-md-4" onClick={function noRefCheck(){}} />
        <Collapse className="col-md-4" navbar>
          <Nav
            className="me-auto col-md-12"
            navbar
          >
            <NavItem className="my-recipe-label col-md-5">
              <NavLink href="/CreateRecipe">
                Mi Receta
              </NavLink>
            </NavItem>

            <NavItem className="col-md-5">
              <NavLink className="login-label" to ="/something">
                Login
                <FaUserCircle className="login-icon"/>
              </NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
</div>
    )
    
}

export default NavBar;