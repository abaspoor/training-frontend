import React, {useState, useEffect} from "react";
import './App.css';
import Header from "./components/header";
import Main from "./components/main";
import Sidebar from "./components/sidebar";
import { ThemeProvider} from "@mui/material/styles";
import theme from "./theme";

function App() {

  return (
      <ThemeProvider theme={theme}>
    <div className="App">
      <header>
          <Header/>
          <div className="general-content">
              <Sidebar/>
              <Main/>
          </div>
      </header>
    </div>
      </ThemeProvider>
  );
}

export default App;
