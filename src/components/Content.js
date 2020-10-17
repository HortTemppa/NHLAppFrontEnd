import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import Home from "./Home";
import Players from "./statComponents/Players";
import Teams from "./statComponents/Teams";
import SingleTeam from "./statComponents/SingleTeam";
import SinglePlayer from "./statComponents/SinglePlayer";
import Standings from "./statComponents/Standings";
import Login from "./loginComponents/Login";
import Favorites from "./Favorites";
import Logout from "./loginComponents/Logout";

const Content = () => {
  return (
    <>
      <Switch>
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
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default Content;
