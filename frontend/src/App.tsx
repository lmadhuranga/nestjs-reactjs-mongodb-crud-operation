import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home';
import Login from './components/Login/Login';
import SubscriptionPackages from './pages/SubscriptionPackages';
import ToastMessage from './components/ToastMessage';

const App: React.FC = () => {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<SubscriptionPackages showToast={setToast} />} />
      </Routes>
      {toast && <ToastMessage type={toast.type} message={toast.message} />}
    </Router>
  );
};

export default App;
