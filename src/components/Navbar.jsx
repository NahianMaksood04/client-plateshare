import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navItem = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium client-smooth ${
          isActive ? "bg-primary text-base-100" : "hover:bg-base-200"
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-base-100/70 border-b border-base-200">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/logo.svg" className="w-8 h-8" />
            <span className="font-bold text-lg">PlateShare</span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-2 items-center">
          {navItem("/", "Home")}
          {navItem("/foods", "Available Foods")}
          {!user && <Link to="/login" className="btn btn-sm btn-secondary">Login</Link>}
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary">
                  <img src={user?.photoURL || "/src/assets/logo.svg"} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
              >
                <li><Link to="/add-food">Add Food</Link></li>
                <li><Link to="/manage-foods">Manage My Foods</Link></li>
                <li><Link to="/my-requests">My Food Requests</Link></li>
                <li>
                  <button onClick={logout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button className="btn btn-ghost" onClick={() => setOpen(!open)}>
            Menu
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-base-200">
          <div className="container mx-auto py-2 flex flex-col gap-2">
            {navItem("/", "Home")}
            {navItem("/foods", "Available Foods")}
            {!user ? (
              <Link to="/login" className="btn btn-sm btn-secondary w-fit">Login</Link>
            ) : (
              <>
                <Link to="/add-food" className="btn btn-sm btn-ghost w-fit">Add Food</Link>
                <Link to="/manage-foods" className="btn btn-sm btn-ghost w-fit">Manage My Foods</Link>
                <Link to="/my-requests" className="btn btn-sm btn-ghost w-fit">My Food Requests</Link>
                <button onClick={logout} className="btn btn-sm btn-error w-fit">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
