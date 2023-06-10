import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import Topbar from "./scenes/global/Topbar";
import Signup from "./scenes/auth/Signup";
import Login from "./scenes/auth/Login";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import EmailTesting from "./components/SendEmailTesting"; // Added import
import Gallery from "./scenes/gallery";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./index.css";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSidebar(true);
      } else {
        setIsSidebar(false);
      }
    });
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isSidebar ? <Sidebar isSidebar={isSidebar} /> : null}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/api/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/emailtesting" element={<EmailTesting />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
            </main>
            </div></ThemeProvider>
          </ColorModeContext.Provider>
  );
}

export default App;