import React from "react";
import HamburgerMenu from './HamburgerMenu'

const Header = () => {
  return (<>
  <div className = "HeaderWrapper">
    <HamburgerMenu />
    <div className = "Header">
      <h1>HockeyStats</h1>
    </div>
  </div>
    </>
  );
};

export default Header;
