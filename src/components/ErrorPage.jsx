import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <img src="https://i.imgur.com/qIufhof.png" alt="404 Not Found" className="max-w-sm mx-auto mb-8" />
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <p className="text-2xl font-semibold my-4">Oops! Page Not Found.</p>
                <p className="text-lg mb-8">The page you are looking for does not exist.</p>
                <Link to="/" className="btn btn-primary">
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
