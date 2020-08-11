import React from "react";

import { Route, Redirect } from "react-router-dom";

import Home from "./Home";
import Players from "./statComponents/Players";
import Teams from "./statComponents/Teams";
import Standings from "./statComponents/Standings";
import Login from "./loginComponents/Login";

const Content = () => {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/standings">
        <Standings />
      </Route>
      <Route path="/teams">
        <Teams />
      </Route>
      <Route path="/players">
        <Players />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect from="*" to="/" />
    </>
  );
};

export default Content;
