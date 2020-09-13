import React, { useState } from "react";
import { useNHLService } from "../NHLContext";
import { useHistory } from "react-router-dom";
import { Checkbox } from "@material-ui/core";

const Login = () => {
  const [registerUser, setRegisterUser] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const NHLService = useNHLService();

  const history = useHistory();

  const handleRegisterClick = async () => {
    const user = await NHLService.getUserId();

    await NHLService.registerUser(user);

    history.push("/");
  };

  const handleCheckboxChange = () => {
    termsAgreed ? setTermsAgreed(false) : setTermsAgreed(true);
  };

  const handleGoogleClick = async () => {
    const isRegistered = await NHLService.googleClick();

    if (isRegistered) {
      setRegisterUser(false);
      history.push("/");
    } else {
      setRegisterUser(true);
    }
  };

  return registerUser ? (
    <div className="RegisterWrapper">
      <span>You are not yet registered. Please proceed to register.</span>
      <div className="ButtonWrapper">
        <div>
          <Checkbox onChange={handleCheckboxChange} checked={termsAgreed} />
          <span>I agree with the Terms of Service</span>
        </div>
        {termsAgreed ? (
          <button onClick={handleRegisterClick}>
            Register with Google Account
          </button>
        ) : (
          <button className="TermsNotChecked">
            Register with Google Account
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="ButtonWrapper">
      <button onClick={handleGoogleClick}>Login/Register with Google.</button>
    </div>
  );
};

export default Login;
