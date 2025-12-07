import React from 'react';
import DynamicNavbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { DeathFormWizard } from 'registers-module';


function App() {
  const userRole = 'admin'; // Role can be dynamic based on login

  return (
    <div>
      <DynamicNavbar userRole={userRole} />
      <DeathFormWizard/>
    </div>
  );
}

export default App;
