import React from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";

import * as actionCreator from "../../store/action/index";
import localStorageService from "../../helper/localStorage/localStorageService";
import loginApi from "../../helper/axios/loginApi/loginApi";

const GoogleIcon = (props) => {
  const { setRedirectToReferrer } = props;

  const dispatch = useDispatch();

  // const handleLoginGoogle = (event) => {
  //   // popupTools.popup(
  //   //   "http://localhost:5000/oisp/auth/google",
  //   //   "Google Connect",
  //   //   {},
  //   //   (err, user) => {
  //   //     if (err) {
  //   //       console.log("Err", err);
  //   //     } else {
  //   //       console.log("user", user);
  //   //       localStorageService.setUserData(user);
  //   //       setRedirectToReferrer(true);
  //   //       dispatch(actionCreator.authSuccess(user));
  //   //     }
  //   //   }
  //   // );
  //   // event.preventDefault();
  //   // window.open("http://localhost:5000/oisp/auth/google", "_self");
  // };

  const responseSuccessGoogle = async (response) => {
    const verifiedData = await loginApi.postIdToken(response.tokenId);
    const user = verifiedData.user;
    localStorageService.setUserData(user);
    setRedirectToReferrer(true);
    dispatch(actionCreator.authSuccess(user));
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Google"
      onSuccess={responseSuccessGoogle}
      onFailure={responseErrorGoogle}
      cookiePolicy={"single_host_origin"}
      render={(props) => (
        <button
          className="login--google"
          id="buttonGoogle"
          onClick={props.onClick}
        >
          <img
            width="40px"
            style={{ margin: "10px" }}
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
          Google
        </button>
      )}
    />
  );
};

export default GoogleIcon;
