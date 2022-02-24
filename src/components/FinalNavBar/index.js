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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { firebase } from '../../Firebase/firebase-config'
import { login, userApp, newUserApp  } from '../../actions/auth';
import { Spinner } from "reactstrap";
import { getUsers } from "../../services/user";

const FinaNavBar = ({ handleSearchBar }) => {
  const [content, setContent] = useState("");

  // ******Checking admin
  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ admin, setAdmin ] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user?.uid){
        dispatch( login ( user.uid, user.displayName ) )
        validateRol(user.email)
        //console.log(admin);
        dispatch( newUserApp)
        setIsLoggedIn( true );
      }else{
        setIsLoggedIn( false );
        setAdmin(false)
      }
      setChecking(false);
    })
  }, [ dispatch, checking, isLoggedIn, admin ])
  
  const validateRol = async (emailToValidate) =>{
    const data = await getUsers();
    const userList = data.data.users
    const UserExist = userList.filter(user=>{
        return user.mail===emailToValidate
      })
      console.log(UserExist);
    if(UserExist.length === 1){
      dispatch(userApp('admin'))
      setAdmin(true)
    }
  }    

  if ( checking ) {
    return (
      <>
        <Spinner
          className='spinner'
          color="info"
          type="grow"
          size="lg"
        ></Spinner>
          <h1 className='Waiting'>Espere...cargando Kóoben</h1>
        </> 
     )
}
   // ******Checking admin


  const handleSearch = (e) => {
    console.log(e.currentTarget.value);
    setContent(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando...");
    if (content?.trim().length > 2) {
      const builRequest = `search=${content?.trim()}`;
      handleSearchBar(builRequest);
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

          {
            handleSearchBar ? 
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
              </div> :
            null
          }



          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar className="navItems">
            <Nav navbar>
              <NavItem>
                <NavLink className="textLinksNewNavBar">
                  <Link className="linkNavbar" to="/my_recipe">Mi receta</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="textLinksNewNavBar">
                  <Link className="linkNavbar" to="/developer">Developer</Link>
                </NavLink>
              </NavItem>
              {
                admin ?
                <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav className="textLinksNewNavBar">
                  Admin
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link className="linkNavbar" to="/create_recipe">Crear receta</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>:
              null
              }
            </Nav>
          </Collapse>
          <Facebook />
        </Navbar>
      </div>
    </>
  );
};

export default FinaNavBar;
