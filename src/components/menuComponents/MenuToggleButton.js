import React from "react";

import Menu from "@material-ui/icons/Menu";
import MenuOpen from "@material-ui/icons/MenuOpen";

const MenuToggleButton = ({ open, setOpen }) => {
  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };
  return open ? (
    <MenuOpen fontSize="large" className="MenuButton" onClick={handleClick} />
  ) : (
    <Menu fontSize="large" className="MenuButton" onClick={handleClick}></Menu>
  );
};

export default MenuToggleButton;
