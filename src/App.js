import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import Topbar from "./scenes/navbar/Topbar";
import Sidebar from "./scenes/navbar/Sidebar";
import Signup from "./scenes/Signup";
import Login from "./scenes/Login";
import Dashboard from "./scenes/Dashboard";
import Clients from "./scenes/Clients";
import ClientForm from "./scenes/ClientForm";
import Invoices from "./scenes/Invoices";
import InvoiceForm from "./scenes/InvoiceForm";
import EmailTesting from "./components/SendEmailTesting"; // Added import
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
              <Route path="/clients" element={<Clients />} />
              <Route path="/clientform" element={<ClientForm />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoiceform" element={<InvoiceForm />} />
              <Route path="/emailtesting" element={<EmailTesting />} />
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
            </main>
            </div></ThemeProvider>
          </ColorModeContext.Provider>
  );
}

export default App;