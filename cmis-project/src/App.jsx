import React from 'react';
import DynamicNavbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const userRole = 'admin'; // Role can be dynamic based on login

  return (
    <div>
      <h1>Testing git teams</h1>
      <DynamicNavbar userRole={userRole} />
      <Dashboard />
    </div>
  );
}

export default App;
