import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AvailableFoods from './pages/AvailableFoods';
import AddFood from './pages/AddFood';
import ManageFoods from './pages/ManageFoods';
import UpdateFood from './pages/UpdateFood';
import FoodDetails from './pages/FoodDetails';
import MyRequests from './pages/MyRequests';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';

export default function App() {
return (
<div className="min-h-screen flex flex-col">
<Navbar />
<main className="flex-1">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/foods" element={<AvailableFoods />} />
<Route path="/add-food" element={<PrivateRoute><AddFood /></PrivateRoute>} />
<Route path="/manage-foods" element={<PrivateRoute><ManageFoods /></PrivateRoute>} />
<Route path="/update-food/:id" element={<PrivateRoute><UpdateFood /></PrivateRoute>} />
<Route path="/food/:id" element={<PrivateRoute><FoodDetails /></PrivateRoute>} />
<Route path="/my-requests" element={<PrivateRoute><MyRequests /></PrivateRoute>} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="*" element={<NotFound />} />
</Routes>
</main>
<Footer />
<Toaster position="top-center" />
</div>
);
}