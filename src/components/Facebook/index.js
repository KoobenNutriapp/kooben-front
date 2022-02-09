import "./Facebook.scss";
import FacebookLogin from 'react-facebook-login'
import { useState } from "react";

const Facebook = () => {

  const [fbItems, setFbItems] = useState()

  const componentClicked = () => {
    console.log('Click en botón');
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <>
      {
        fbItems === 'isLoggedIn' ? 
          console.log('In') :
          <FacebookLogin
          appId="251634143656901"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook} />
      }

    </>
  );
};

export default Facebook;