import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import { FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";
import logo from "/logo.svg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-primary ${isActive ? "text-primary font-bold" : "font-medium"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-foods"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-primary ${isActive ? "text-primary font-bold" : "font-medium"
            }`
          }
        >
          Available Foods
        </NavLink>
      </li>
    </>
  );

  const userMenu = (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={
              user?.photoURL ||
              `https://ui-avatars.com/api/?name=${user?.displayName}&background=random&color=fff`
            }
            alt="user"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-56"
      >
        <li className="p-2 font-heading font-semibold border-b border-base-300">
          {user?.displayName}
        </li>
        <li className="mt-1">
          <NavLink to="/dashboard" className="py-2">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-food" className="py-2">
            Add Food
          </NavLink>
        </li>
        <li className="mt-1 border-t border-base-300">
          <button
            onClick={handleLogout}
            className="flex items-center text-error py-2 font-bold"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-base-100/90 backdrop-blur-sm shadow-md"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold btn btn-ghost"
        >
          <motion.img
            src={logo}
            alt="PlateShare Logo"
            className="h-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </Link>

        <ul className="hidden lg:flex space-x-8 text-lg">{navLinks}</ul>

        <div className="flex items-center gap-3">
          {user ? (
            userMenu
          ) : (
            <Link
              to="/login"
              className="btn btn-primary rounded-full px-6 font-bold"
            >
              Login
            </Link>
          )}

          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-base-100/95 backdrop-blur-md shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4 text-lg">
            {navLinks}
          </ul>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
