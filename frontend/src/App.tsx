import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home';
import Login from './components/Login/Login';
import SubscriptionPackages from './pages/SubscriptionPackages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<SubscriptionPackages />} />
      </Routes>
    </Router>
  );
};

export default App;
