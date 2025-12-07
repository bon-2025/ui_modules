import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DynamicNavbar from "./components/Navbar";
import { routeConfig } from "./config/routeConfig";

function App() {
  const userRole = "admin"; // dynamic

  return (
    <Router>
      <DynamicNavbar userRole={userRole} />
      <Routes>
        {Object.entries(routeConfig).map(([path, Component]) => (
           <Route key={path} path={path} element={Component } />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
