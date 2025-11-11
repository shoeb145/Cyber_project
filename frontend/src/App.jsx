import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ModulesPage from './pages/ModulesPage'
import LabsPage from './pages/LabsPage'
import Community from './pages/Community'

import PrivateRoute from './lib/PrivateRoute'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function App() {
   const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await axios.get("http://localhost:5001/api/user/me", {
        withCredentials: true,
      });
      setUser(user.data);
    };

    fetchUser();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Individual Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <Dashboard  user={user}/>
        </PrivateRoute>
        }
      />
      <Route
  path="/modules"
  element={
    <PrivateRoute allowedRoles={["user", "admin"]}>
      <ModulesPage user={user} />
    </PrivateRoute>
  }
/>
      <Route
        path="/labs"
        element={
        
            <LabsPage />
      
        }
      />
      <Route
        path="/community"
        element={
         
            <Community />
          
        }
      />

      {/* Redirect any unknown route to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}