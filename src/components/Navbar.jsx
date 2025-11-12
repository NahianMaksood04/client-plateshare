import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      className="navbar bg-base-100 shadow-md px-6"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          🍽️ PlateShare
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/available-foods">Available Foods</Link></li>
          {user ? (
            <li className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/default.png"} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li><Link to="/add-food">Add Food</Link></li>
                <li><Link to="/manage-my-foods">Manage My Foods</Link></li>
                <li><Link to="/my-food-requests">My Requests</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </li>
          ) : (
            <li><Link to="/login" className="btn btn-primary">Login</Link></li>
          )}
        </ul>
      </div>
    </motion.nav>
  );
};
export default Navbar;
