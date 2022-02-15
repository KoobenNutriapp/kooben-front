import "./Facebook.scss";
import React, { useEffect, useState } from 'react';
import { Button } from "reactstrap";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch } from 'react-redux';
import { firebase } from '../../Firebase/firebase-config'
import { startFacebooklogin, startLogout } from "../../actions/auth";
import { login } from '../../actions/auth';
import { getUsers } from "../../services/user";


const Facebook = () => {

  const dispatch = useDispatch();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ avatar, setAvatar ] = useState();
  const [ admin, setAdmin ] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      console.log(user);
      if(user?.uid){
        dispatch( login ( user.uid, user.displayName, user.photoURL, user.email ) )
        validateRol(user.email)
        console.log(admin);
        setIsLoggedIn( true );
        setAvatar(user.photoURL)
      }else{
        setIsLoggedIn( false );
        setAvatar('')
        setAdmin(false)
      }
    })
  }, [ dispatch, isLoggedIn, admin ])


  const handleLoginFB = (e) => {
    e.preventDefault()
    console.log('Login with FaceBook');
    dispatch ( startFacebooklogin ());
  }

  const handleLogoutFB = (e) => {
    e.preventDefault()
    console.log('Logout from FaceBook');
    dispatch ( startLogout())
  }

  const validateRol = async (emailToValidate) =>{
    const data = await getUsers();
    const userList = data.data.users
    const test = userList.filter(user=>{
        return user.mail===emailToValidate
      })
    if(test.length === 1){
      setAdmin(true)
    }
  }

  

  return (
    <>
      {
        isLoggedIn ? 
        <Button onClick={handleLogoutFB} outline color="primary" className="facebook-login">
        <IconButton>
          <FacebookIcon className="facebook-icon"/>
        </IconButton>
        Logout from Facebook
        <img className="avatar" src={avatar}/>
      </Button>
      :
      <Button onClick={handleLoginFB} outline color="primary" className="facebook-login">
        <IconButton>
          <FacebookIcon className="facebook-icon"/>
        </IconButton>
        Login with Facebook
        <IconButton>
          <AccountCircleIcon className="avatar-empty"/>
        </IconButton>
      </Button>
      }
    </>
  );
};

export default Facebook;
