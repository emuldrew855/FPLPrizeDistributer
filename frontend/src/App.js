import React from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import League from "./League/League";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main/Main";

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <header className="App-header">
          <Router>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="league/:leagueId" element={<League />} />
            </Routes>
          </Router>
        </header>
        <Footer className="ft" />
      </div>
    </>
  );
}

export default App;
