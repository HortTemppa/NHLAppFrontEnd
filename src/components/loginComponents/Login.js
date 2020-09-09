import React from "react";
import { useNHLService } from "../NHLContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const NHLService = useNHLService();

  const history = useHistory();

  const handleGoogleClick = async () => {
    const userId = await NHLService.googleClick();

    history.push("/");
  };
  return <button onClick={handleGoogleClick}>Signin with Google.</button>;
};

export default Login;
