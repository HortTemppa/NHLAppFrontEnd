import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Content from "./components/Content";

import { BrowserRouter as Router } from "react-router-dom";
import { NHLProvider } from "./components/NHLContext";

function App() {
  const [loggedIn, setLoggedIn] = useState();

  return (
    <NHLProvider onLoggedInChange={setLoggedIn}>
      <Router>
        <Header />
        <Content />
      </Router>
    </NHLProvider>
  );
}

export default App;
