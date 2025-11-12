import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingSpinner from "../components/LoadingSpinner";

AOS.init();

const fetchFeatured = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/foods/featured`);
  return res.data;
};

const Home = () => {
  const { data, isLoading } = useQuery(["featuredFoods"], fetchFeatured, {
    staleTime: 1000 * 60 * 2,
  });

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Share surplus. Feed neighbors. Build community.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            PlateShare connects people who have extra food with neighbors who need it. Post, browse,
            request, and collect with ease.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/available-foods" className="btn btn-primary btn-lg">
              View All Foods
            </Link>
            <Link to="/add-food" className="btn btn-ghost btn-lg">
              Donate Food
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <img
            src="/assets/hero-food.jpg"
            alt="Community sharing"
            className="w-full rounded-xl shadow-lg object-cover h-72 md:h-96"
          />
        </motion.div>
      </section>

      {/* Featured */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Donations</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.length ? (
              data.map((food) => (
                <div
                  key={food._id}
                  data-aos="fade-up"
                  className="card bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img src={food.food_image} alt={food.food_name} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{food.food_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{food.food_quantity}</p>
                    <p className="text-sm text-gray-500 mt-1">Pickup: {food.pickup_location}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <Link to={`/food/${food._id}`} className="btn btn-sm btn-outline">
                        View Details
                      </Link>
                      <span className="text-xs text-gray-400">
                        Expires: {new Date(food.expire_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No featured donations at the moment.</p>
            )}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link to="/available-foods" className="btn btn-outline">
            Show All
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-base-100 rounded-lg shadow-sm" data-aos="fade-right">
          <h4 className="font-bold">1. Post Food</h4>
          <p className="mt-2 text-sm text-gray-600">Share what's left — upload a photo, quantity, and pickup address.</p>
        </div>
        <div className="p-6 bg-base-100 rounded-lg shadow-sm" data-aos="fade-up">
          <h4 className="font-bold">2. Find Food</h4>
          <p className="mt-2 text-sm text-gray-600">Search available donations nearby and view details.</p>
        </div>
        <div className="p-6 bg-base-100 rounded-lg shadow-sm" data-aos="fade-left">
          <h4 className="font-bold">3. Collect</h4>
          <p className="mt-2 text-sm text-gray-600">Request and coordinate pickup with the donor.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="mt-12 p-6 rounded-lg bg-gradient-to-r from-yellow-50 to-green-50" data-aos="zoom-in">
        <h3 className="text-2xl font-semibold">Our Mission</h3>
        <p className="mt-2 text-gray-700">
          Reduce food waste and nourish our community. PlateShare makes giving simple and dignified.
        </p>
      </section>
    </div>
  );
};

export default Home;
