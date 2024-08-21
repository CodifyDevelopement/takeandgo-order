import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import AdminLogin from './AdminLogin';
import Order from './Order';
import './styles.css'; // Import global styles

const App = () => (
  <Router>
    <div className="container">
      <Routes>
          <Route path="/" element={<Order />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </div>
  </Router>
);

export default App;
