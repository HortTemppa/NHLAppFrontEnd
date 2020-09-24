import React, { useState } from "react";
import LoginOrRegister from "./LoginOrRegister";
import Register from "./Register";

const Login = () => {
  const [registerUser, setRegisterUser] = useState();

  return registerUser ? (
    <Register />
  ) : (
    <LoginOrRegister setRegisterUser={setRegisterUser} />
  );
};

export default Login;
