import React from "react";

import { Route, Redirect } from "react-router-dom";

import Home from "./Home";
import Players from "./statComponents/Players";
import Teams from "./statComponents/Teams";
import SingleTeam from "./statComponents/SingleTeam";
import SinglePlayer from "./statComponents/SinglePlayer";
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
      <Route exact path="/teams">
        <Teams />
      </Route>
      <Route path="/teams/:id">
        <SingleTeam />
      </Route>
      <Route exact path="/players">
        <Players />
      </Route>
      <Route path="/players/:id">
        <SinglePlayer />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect from="*" to="/" />
    </>
  );
};

export default Content;
