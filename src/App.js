import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import EmailTesting from "./components/SendEmailTesting"; // Added import
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./index.css";
// import Login from './Login';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  fetch("https://cryptic-woodland-28293.herokuapp.com/greeting").then(res =>
  res.json()
  ).then(data => console.log(data))


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/api/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/emailtesting" element={<EmailTesting />} />
            </Routes>
            </main>
            </div></ThemeProvider>
          </ColorModeContext.Provider>
  );
}

export default App;






// // App.js
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./scenes/dashboard";
// import Invoices from "./scenes/invoices";
// import Form from "./scenes/form";
// import DogWalking from "./scenes/dogWalking";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import "./index.css";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//             <Routes>
//               <Route path="/" element={<Signup />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/api/invoices" element={<Invoices />} />
//               <Route path="/form" element={<Form />} />
//               <Route path="/dogWalking" element={<DogWalking />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;






// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Invoices from "./scenes/invoices";
// import Form from "./scenes/form";
// import EmailTesting from "./components/SendEmailTesting"; // Added import
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import "./index.css";
// // import Login from './Login';

// function App() {
//   fetch("https://cryptic-woodland-28293.herokuapp.com/greeting").then(res =>
//   res.json()
//   ).then(data => console.log(data))


//   return (
//     // <div className="App">
//     //   app
//     // </div>




