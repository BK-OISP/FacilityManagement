import React from "react";
import popupTools from "popup-tools";
import { useDispatch } from "react-redux";

import * as actionCreator from "../../store/action/index";
import localStorageService from "../../helper/localStorage/localStorageService";

const GoogleIcon = (props) => {
  const { setRedirectToReferrer } = props;

  const dispatch = useDispatch();

  const handleLoginGoogle = () => {
    popupTools.popup(
      "http://localhost:5000/oisp/auth/google",
      "Google Connect",
      {},
      (err, user) => {
        if (err) {
          console.log("Err", err);
        } else {
          console.log("user", user);
          localStorageService.setUserData(user);
          setRedirectToReferrer(true);
          dispatch(actionCreator.authSuccess(user));
        }
      }
    );
  };
  return (
    <button
      className="login--google "
      id="buttonGoogle"
      onClick={handleLoginGoogle}
    >
      <img
        width="40px"
        style={{ margin: "10px" }}
        alt="Google sign-in"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
      />
      Google
    </button>
  );
};

export default GoogleIcon;
