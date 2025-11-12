import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedFoods } from '../api/foods';
import FoodCard from '../components/FoodCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from '../components/ui/Loader';

export default function Home() {
  const { data: featured, isLoading } = useQuery({
    queryKey: ['featuredFoods'],   // wrap key in object
    queryFn: fetchFeaturedFoods,   // function
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-heading leading-tight"
          >
            Share a Plate. Feed a Neighbor.
          </motion.h1>
          <p className="mt-4 text-lg text-muted max-w-xl">
            PlateShare connects those who have surplus food with people in need — reducing waste and building community.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/foods" className="btn btn-primary btn-lg">View All Foods</Link>
            <a href="#how" className="btn btn-ghost">How it works</a>
          </div>
        </div>
        <div>
          <div className="bg-muted rounded-lg p-4">
            <img src="/hero-plate.jpg" alt="hero" className="w-full h-56 object-cover rounded" />
          </div>
        </div>
      </div>

      {/* Featured */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured Foods</h2>
          <Link to="/foods" className="btn btn-outline btn-sm">Show All</Link>
        </div>

        {isLoading ? <Loader /> : (
          <div className="grid md:grid-cols-3 gap-6">
            {(featured || []).map(f => <FoodCard key={f._id} food={f} />)}
          </div>
        )}
      </section>

      {/* How it works */}
      <section id="how" className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold">1. Post Food</h3>
          <p className="text-sm text-muted mt-2">Share details, photos and pickup info — quickly and securely.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold">2. Find Food</h3>
          <p className="text-sm text-muted mt-2">Search available items near you and request what you need.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold">3. Collect & Deliver</h3>
          <p className="text-sm text-muted mt-2">Owner accepts requests, confirms pickup and shares with community.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="mt-16 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="mt-3 text-muted">PlateShare aims to drastically reduce food waste by matching surplus meals with neighbors in need.</p>
          </div>
          <div className="flex gap-4">
            <div className="stats shadow rounded w-full">
              <div className="stat">
                <div className="stat-value">1.2k</div>
                <div className="stat-desc">Meals Shared</div>
              </div>
            </div>
            <div className="stats shadow rounded w-full">
              <div className="stat">
                <div className="stat-value">380</div>
                <div className="stat-desc">Active Donators</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
