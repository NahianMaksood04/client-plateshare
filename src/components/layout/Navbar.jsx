import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">PS</div>
            <div>
              <div className="text-lg font-heading">PlateShare</div>
              <div className="text-xs text-muted">Share surplus. Feed community.</div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/" className="hover:underline">Home</NavLink>
          <NavLink to="/foods" className="hover:underline">Available Foods</NavLink>

          {!user ? (
            <>
              <button onClick={() => navigate('/login')} className="btn btn-outline btn-sm">Login</button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/add-food" className="btn btn-sm btn-primary">Add Food</NavLink>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || user.email)} alt="avatar" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/manage-foods">Manage My Foods</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-56">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/foods">Available Foods</Link></li>
              {!user ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/add-food">Add Food</Link></li>
                  <li><Link to="/manage-foods">Manage My Foods</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
