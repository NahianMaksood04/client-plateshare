import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => (
  <>
    <Navbar />
    <div className="min-h-[calc(100vh-200px)]">
      <Outlet />
    </div>
    <Footer />
  </>
);
export default MainLayout;
