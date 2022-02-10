import "./Facebook.scss";
import { useDispatch, useSelector } from 'react-redux';
import { startFacebooklogin } from "../../actions/auth";


const Facebook = () => {

  const dispatch = useDispatch();


  const handleFB = (e) => {
    e.preventDefault()
    console.log('Login with FaceBook');
    dispatch ( startFacebooklogin ());
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
      <button onClick={handleFB}>
        LogIn with Facebook
      </button>

    </>
  );
};

export default Facebook;
