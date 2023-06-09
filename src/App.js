import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import DogWalking from "./scenes/dogWalking"; // Added import
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./index.css";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

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
              <Route path="/dogWalking" element={<DogWalking />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;






// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Invoices from "./scenes/invoices";
// import Form from "./scenes/form";
// // import Gallery from "./scenes/gallery";
// // import ChildCare from "./scenes/childCarePage";
// // import Cooking from "./scenes/cookingPage";
// // import Cleaning from "./scenes/cleaningPage";
// // import Dog from "./scenes/dogWalking";
// // import Handjobs from "./scenes/handjobPage";
// // import Yard from "./scenes/yardWorkPage";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import './index.css';


// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);



//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
        
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar={setIsSidebar} />
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/Invoices" element={<Invoices />} />
//               <Route path="/form" element={<Form />} />
//               {/* <Route path="/gallery" element={<Gallery />} />
//               <Route path="/childCarePage" element={<ChildCare />} />
//               <Route path="/cleaningPage" element={<Cleaning />} />
//               <Route path="/cookingPage" element={<Cooking />} />
//               <Route path="/dogWalking" element={<Dog />} />
//               <Route path="/handjobPage" element={<Handjobs />} />
//               <Route path="/yardWorkPage" element={<Yard />} /> */}
//             </Routes>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;