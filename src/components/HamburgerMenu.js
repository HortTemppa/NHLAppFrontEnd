import React, { useState } from "react";

import MenuToggleButton from "./menuComponents/MenuToggleButton";
import Menu from "./menuComponents/Menu";
import FavoriteMenu from "./menuComponents/FavoriteMenu";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuToggleButton open={open} setOpen={setOpen} />
      <Menu open={open} setOpen={setOpen} />
      <FavoriteMenu />
    </>
  );
};

export default HamburgerMenu;
