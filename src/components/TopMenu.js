import React from "react";
import { useHistory } from "react-router-dom";

const TopMenu = () => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push("/login");
  };

  return (
    <div className="TopMenu">
      <span onClick={handleLoginClick} className="LoginButton">
        Login
      </span>
    </div>
  );
};

export default TopMenu;
