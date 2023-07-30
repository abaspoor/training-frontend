import React from 'react';
import './App.css';
import Header from "./components/layout/header";
import Main from "./components/layout/main";
import Sidebar from "./components/layout/sidebar";
import { ThemeProvider} from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {
  const user = JSON.parse(localStorage.getItem('bwf-user'));

  return (
      <ThemeProvider theme={theme}>
          <AuthProvider user={user}>
              <SnackbarProvider maxSnack={3}>
            <div className="App">
                <Router>
                        <Header/>
                        <div className="general-content">
                            <Sidebar/>
                            <Main/>
                        </div>
                </Router>
            </div>
              </SnackbarProvider>
          </AuthProvider>
      </ThemeProvider>
  );
}

export default App;
