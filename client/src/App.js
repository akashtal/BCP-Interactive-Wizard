import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Wizard from './components/Wizard';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [bcpData, setBcpData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/wizard" replace />} />
          <Route 
            path="/wizard" 
            element={
              <Wizard 
                bcpData={bcpData}
                setBcpData={setBcpData}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            } 
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;