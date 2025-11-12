import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <img src="/assets/not-found.gif" alt="404" className="mx-auto w-64" />
        <h2 className="text-3xl font-bold mt-4">404 — Page Not Found</h2>
        <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary mt-6">Back to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
