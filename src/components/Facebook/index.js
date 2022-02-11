import "./Facebook.scss";
import { useDispatch, useSelector } from 'react-redux';
import { startFacebooklogin, startLogout } from "../../actions/auth";


const Facebook = () => {

  const dispatch = useDispatch();


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
      <button onClick={handleLoginFB}>
        ☑Login with Facebook
      </button>
      <button onClick={handleLogoutFB}>
        ↩Logout from Facebook
      </button>

    </>
  );
};

export default Facebook;
