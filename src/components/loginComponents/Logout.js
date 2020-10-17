import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useNHLService } from "../NHLContext";

const Logout = () => {
  const NHLService = useNHLService();
  const loggedIn = NHLService.checkLogin();

  const history = useHistory();

  useEffect(() => {
    if (!loggedIn) {
      history.push("/");
      return;
    }

    NHLService.logout();
    history.push("/");
  }, [history, NHLService, loggedIn]);

  return null;
};

export default Logout;
