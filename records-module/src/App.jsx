import { useState } from 'react';
import ManagementRecord from './components/ManagementRecord';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container my-2">
      {/* my-5 adds vertical margin, container adds horizontal padding */}
      <ManagementRecord />
    </div>
  );
}

export default App;
