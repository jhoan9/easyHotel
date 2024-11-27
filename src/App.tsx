import React from 'react';
import './App.css';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard/AdminDashboard';

const App: React.FC = () => {

  const isAdmin = window.location.pathname === '/admin';
  return (
    <div className="App">
      {isAdmin ? <AdminDashboard /> : <Dashboard />}
    </div>
  );
}

export default App;
