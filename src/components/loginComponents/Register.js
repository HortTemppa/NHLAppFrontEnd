import React, { useState } from "react";

import { Checkbox } from "@material-ui/core";

import { useNHLService } from "../NHLContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const NHLService = useNHLService();
  const history = useHistory();

  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleRegisterClick = async () => {
    const user = await NHLService.getUserId();

    await NHLService.registerUser(user);

    history.push("/");
  };

  const handleCheckboxChange = () => {
    termsAgreed ? setTermsAgreed(false) : setTermsAgreed(true);
  };

  return (
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
  );
};

export default Register;
