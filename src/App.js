import React, {useState, useEffect} from "react";
import './App.css';
import Header from "./components/header";
import Main from "./components/main";
import Sidebar from "./components/sidebar";
import { ThemeProvider} from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
      <ThemeProvider theme={theme}>
    <div className="App">
        <Router>
            <header>
              <Header/>
              <div className="general-content">
                  <Sidebar/>
                  <Main/>
              </div>
        </header>
        </Router>
    </div>
      </ThemeProvider>
  );
}

export default App;
