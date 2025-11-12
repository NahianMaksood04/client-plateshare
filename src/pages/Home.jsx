import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedFoods } from '../api';
import FeaturedFoodCard from '../components/FeaturedFoodCard';
import Loader from '../components/Loader';
import AnimatedSection from '../components/AnimatedSection';
import { FaHandHoldingHeart, FaSearch, FaPeopleCarry } from 'react-icons/fa';

// Illustration for the Hero section
const HeroIllustration = () => (
    <svg width="450" height="450" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFB74D', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#E57373', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path fill="url(#grad1)" d="M63.9,-53.9C80.8,-36.8,91.1,-10.3,89.8,15.1C88.5,40.5,75.6,64.8,55.5,77.5C35.4,90.2,8.1,91.3,-18.5,82.5C-45.1,73.7,-71,55,-81.2,30.9C-91.4,6.8,-85.9,-22.7,-70.6,-43.2C-55.3,-63.7,-30.2,-75.2,-3.3,-73.8C23.6,-72.4,47,-69.9,63.9,-53.9Z" transform="translate(100 100)" />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20" fill="white" fontFamily="Lexend">
            <tspan x="50%" dy="-1.2em">Share</tspan>
            <tspan x="50%" dy="1.2em">&</tspan>
            <tspan x="50%" dy="1.2em">Connect</tspan>
        </text>
    </svg>
);

const Home = () => {
    const { data: featuredFoods = [], isLoading } = useQuery({
        queryKey: ['featuredFoods'],
        queryFn: getFeaturedFoods,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="container mx-auto px-4">
                <div className="hero min-h-[80vh]">
                                            <div className="hero-content flex-col lg:flex-row-reverse items-center">
                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="lg:w-1/2">
                                                <img src="/share.jpg" className="w-full rounded-2xl shadow-2xl" alt="Food Sharing Community" />
                                            </motion.div>
                                            <div className="lg:mr-10 text-center lg:text-left">                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-5xl lg:text-7xl font-bold font-heading leading-tight"
                            >
                                Share More, <br />Waste Less.
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
                                className="py-6 text-xl max-w-xl mx-auto lg:mx-0 text-gray-800"
                            >
                                Join our community to share your surplus food. Every plate makes a difference and helps build a stronger, more sustainable neighborhood.
                            </motion.p>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
                                <Link to="/available-foods" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg font-bold">Explore Foods</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Foods Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-heading">Featured Foods</h2>
                        <p className="text-lg mt-2 text-neutral/70">Freshly added by our generous community members.</p>
                    </div>
                    {isLoading ? <Loader /> : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {featuredFoods.map(food => (
                                <FeaturedFoodCard key={food._id} food={food} />
                            ))}
                        </motion.div>
                    )}
                    <div className="text-center mt-16">
                        <Link to="/available-foods" className="btn btn-primary rounded-full px-8 font-bold">Show All Foods</Link>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <AnimatedSection>
                <div className="container mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-heading">How It Works</h2>
                        <p className="text-lg mt-2 text-neutral/70">A simple 3-step process to share and receive food.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                        <div className="p-8">
                            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mx-auto mb-6">
                                <FaHandHoldingHeart className="text-4xl text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading mb-2">1. Post Food</h3>
                            <p>Got extra food? Post it on PlateShare with a few details. It's quick, easy, and helps a neighbor in need.</p>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-secondary/10 mx-auto mb-6">
                                <FaSearch className="text-4xl text-secondary" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading mb-2">2. Find & Request</h3>
                            <p>Browse available food in your area. See something you like? Send a request with just one click.</p>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-accent/10 mx-auto mb-6">
                                <FaPeopleCarry className="text-4xl text-accent" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading mb-2">3. Collect & Enjoy</h3>
                            <p>Arrange a pickup with the donor. You get a delicious meal, and they get the satisfaction of helping out.</p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Our Mission Section */}
            <div className="bg-white py-24">
                <AnimatedSection>
                    <div className="container mx-auto px-4">
                        <div className="hero">
                            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                                
                                <div className="lg:mr-10">
                                    <h2 className="text-4xl font-bold font-heading">Our Mission</h2>
                                    <p className="py-6 text-lg">We are dedicated to building a sustainable community by connecting neighbors to prevent food waste. Our platform empowers individuals to make a positive impact on the environment and fight food insecurity, one shared meal at a time.</p>
                                    <p className="py-6 text-lg">Through PlateShare, we envision a world where no good food goes to waste, and every person has access to nutritious meals. Join us in creating a network of generosity and sustainability.</p>
                                    <button className="btn btn-primary rounded-full px-8 font-bold">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default Home;
