import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '/logo.svg';

const Footer = () => {
    return (
        <footer className="bg-base-100 text-base-content">
            
            <div className="container mx-auto px-4 py-10 text-center">
                <Link to="/" className="inline-block mb-4">
                    <img src={logo} alt="PlateShare Logo" className="h-12" />
                </Link>
                <p className="font-heading text-lg max-w-md mx-auto mb-4">
                    Reducing food waste and building community, one plate at a time.
                </p>
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="#" className="hover:text-primary transition-colors"><FaTwitter size={24} /></a>
                    <a href="#" className="hover:text-primary transition-colors"><FaFacebook size={24} /></a>
                    <a href="#" className="hover:text-primary transition-colors"><FaInstagram size={24} /></a>
                </div>
                <p className="text-sm opacity-70">
                    Copyright © {new Date().getFullYear()} - All right reserved by PlateShare
                </p>
            </div>
        </footer>
    );
};

export default Footer;
