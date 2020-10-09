import React, { useState } from "react";
import "./App.css";

import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Content from "./components/Content";

import { BrowserRouter as Router } from "react-router-dom";
import { NHLProvider } from "./components/NHLContext";
import HamburgerMenu from "./components/HamburgerMenu";

function App() {
  const [loggedIn, setLoggedIn] = useState();

  return (
    <NHLProvider onLoggedInChange={setLoggedIn}>
      <Router>
        <HamburgerMenu />
        <Header />
        <Content />
      </Router>
    </NHLProvider>
  );
}

export default App;
