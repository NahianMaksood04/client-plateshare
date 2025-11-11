import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
return (
<div className="min-h-screen flex flex-col font-body">
<Navbar />
<main className="flex-1 container mx-auto px-4 md:px-0">
<Outlet />
</main>
<Footer />
</div>
);
};

export default MainLayout;

