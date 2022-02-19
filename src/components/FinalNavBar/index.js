import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Facebook from "../Facebook";
import "./FinalNavBar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const FinaNavBar = ({ callback }) => {
  const [content, setContent] = useState("");

  const handleSearch = (e) => {
    console.log(e.currentTarget.value);
    setContent(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando...");
    if (content?.trim().length > 2) {
      const builRequest = `search=${content?.trim()}`;
      callback(builRequest);
      setContent(e.target.reset());
    }
  };

  return (
    <>
      <div>
        <Navbar
          className="navbar"
          color="light"
          expand="sm"
          fixed="top"
          full
          light
        >
          <NavbarBrand>
          <Link className="linkNavbar" to="/"><div className="logoNewNavBar"></div></Link>
            
          </NavbarBrand>

          <div class="box">
            <form name="search" onSubmit={handleSubmit}>
              <input
                type="text"
                class="input"
                name="txt"
                placeholder="Busca tu receta..."
                onChange={handleSearch}
              />
            </form>
            <i class="fas fa-search"></i>
          </div>

          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar className="navItems">
            <Nav navbar>
              <NavItem>
                <NavLink className="textLinksNewNavBar">
                  <Link className="linkNavbar" to="/MyRecipe">Mi receta</Link>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav className="textLinksNewNavBar">
                  Admin
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link className="linkNavbar" to="/CreateRecipe">Crear receta</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          <Facebook />
        </Navbar>
      </div>
    </>
  );
};

export default FinaNavBar;
