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


const Facebook = () => {

  const dispatch = useDispatch();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ avatar, setAvatar ] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      console.log(user);
      if(user?.uid){
        dispatch( login ( user.uid, user.displayName, user.photoURL ) )
        setIsLoggedIn( true );
        setAvatar(user.photoURL)
      }else{
        setIsLoggedIn( false );
        setAvatar('')
      }
    })
  }, [ dispatch, isLoggedIn ])


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


  

  return (
    <>
      {/* <div
        className="fb-login-button bk"
        data-width=""
        data-size="large"
        data-button-type="login_with"
        data-layout="default"
        data-auto-logout-link="true"
        data-use-continue-as="true"
        onClick={handleFB}
      ></div> */}
      <Button onClick={handleLoginFB} outline color="primary" className="facebook-login">
        <IconButton>
          <FacebookIcon className="facebook-icon"/>
        </IconButton>
        Login with Facebook
        <IconButton>
          <AccountCircleIcon className="avatar-empty"/>
        </IconButton>
      </Button>
      <Button onClick={handleLogoutFB} outline color="primary" className="facebook-login">
        <IconButton>
          <FacebookIcon className="facebook-icon"/>
        </IconButton>
        Logout from Facebook
        <img className="avatar" src={avatar}/>
      </Button>
    </>
  );
};

export default Facebook;
