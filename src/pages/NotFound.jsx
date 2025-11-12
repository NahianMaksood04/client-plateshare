import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <img src="/404-illustration.svg" className="w-80" alt="404" />
      <h2 className="text-2xl font-semibold mt-4">Page not found</h2>
      <p className="text-muted mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
    </div>
  );
}
