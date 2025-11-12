import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import Dashboard from "../pages/Dashboard"; // Import Dashboard
import FoodDetails from "../pages/FoodDetails";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/available-foods",
                element: <AvailableFoods />,
            },
            {
                path: "/add-food",
                element: <PrivateRoute><AddFood /></PrivateRoute>,
            },
            {
                path: "/dashboard", // Add dashboard route
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
            },
            {
                path: "/food/:id",
                element: <PrivateRoute><FoodDetails /></PrivateRoute>,
            },
        ],
    },
]);

export default router;
