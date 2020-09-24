import React from "react";
import { useHistory } from "react-router-dom";
import { useNHLService } from "../NHLContext";

const LoginOrRegister = ({ setRegisterUser }) => {
  const history = useHistory();
  const NHLService = useNHLService();

  const handleGoogleClick = async () => {
    const isRegistered = await NHLService.googleClick();

    if (isRegistered) {
      setRegisterUser(false);
      history.push("/");
    } else {
      setRegisterUser(true);
    }
  };
  return (
    <div className="RegisterWrapper">
      <span>
        By logging in you will be able to add favourite players and teams and
        make comparisons between them.
      </span>
      <div className="ButtonWrapper">
        <button onClick={handleGoogleClick}>Login/Register with Google.</button>
      </div>
    </div>
  );
};

export default LoginOrRegister;
