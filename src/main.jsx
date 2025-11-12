import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import AvailableFoods from "./pages/AvailableFoods";
import AddFood from "./pages/AddFood";
import ManageMyFoods from "./pages/ManageMyFoods";
import UpdateFood from "./pages/UpdateFood";
import MyFoodRequests from "./pages/MyFoodRequests";
import FoodDetails from "./pages/FoodDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "available-foods", element: <AvailableFoods /> },
      {
        path: "food/:id",
        element: (
          <ProtectedRoute>
            <FoodDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-food",
        element: (
          <ProtectedRoute>
            <AddFood />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-my-foods",
        element: (
          <ProtectedRoute>
            <ManageMyFoods />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-food/:id",
        element: (
          <ProtectedRoute>
            <UpdateFood />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-food-requests",
        element: (
          <ProtectedRoute>
            <MyFoodRequests />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryProvider>
    </AuthProvider>
  </React.StrictMode>
);
