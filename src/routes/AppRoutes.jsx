import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Home from '../pages/Home';
import AvailableFoods from '../pages/AvailableFoods';
import FoodDetails from '../pages/FoodDetails';
import AddFood from '../pages/AddFood';
import ManageFoods from '../pages/ManageFoods';
import UpdateFood from '../pages/UpdateFood';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, initializing } = useAuth();
  if (initializing) return null; // or loader
  return user ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<AvailableFoods />} />

          <Route path="/food/:id" element={
            <PrivateRoute><FoodDetails /></PrivateRoute>
          } />

          <Route path="/add-food" element={
            <PrivateRoute><AddFood /></PrivateRoute>
          } />

          <Route path="/manage-foods" element={
            <PrivateRoute><ManageFoods /></PrivateRoute>
          } />

          <Route path="/update-food/:id" element={
            <PrivateRoute><UpdateFood /></PrivateRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute><Profile /></PrivateRoute>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
