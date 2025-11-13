import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAvailableFoods } from "../api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt } from "react-icons/fa";

const FoodCard = ({ food }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="card-custom group"
    >
        <figure className="h-56 overflow-hidden">
            <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </figure>
        <div className="card-body p-5">
            <div className="flex items-start justify-between">
                <h2 className="card-title font-heading text-2xl font-bold text-neutral">
                    {food.foodName}
                </h2>
                <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                        <img src={food.donator.image} alt={food.donator.name} />
                    </div>
                </div>
            </div>
            <p className="text-sm text-neutral/70 -mt-2">by {food.donator.name}</p>

            <div className="flex flex-col gap-2 text-neutral/80 my-3">
                <div className="flex items-center gap-2">
                    <FaUsers className="text-secondary" />
                    <span>Serves {food.foodQuantity}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-secondary" />
                    <span>{food.pickupLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-secondary" />
                    <span>
                        Expires: {new Date(food.expiredDateTime).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div className="card-actions justify-end mt-2">
                <Link
                    to={`/food/${food._id}`}
                    className="btn btn-primary rounded-full px-6"
                >
                    View Details
                </Link>
            </div>
        </div>
    </motion.div>
);

const AvailableFoods = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");

    const { data: foods = [], isLoading } = useQuery({
        queryKey: ["availableFoods"],
        queryFn: getAvailableFoods,
    });

    const filteredAndSortedFoods = useMemo(() => {
        let processedFoods = foods.filter((food) =>
            food.foodName.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        if (sortOption === "expireDate") {
            processedFoods.sort(
                (a, b) => new Date(a.expiredDateTime) - new Date(b.expiredDateTime),
            );
        } else if (sortOption === "quantity") {
            processedFoods.sort((a, b) => b.foodQuantity - a.foodQuantity);
        }

        return processedFoods;
    }, [foods, searchTerm, sortOption]);

    if (isLoading) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold font-heading">Available Foods</h1>
                <p className="mt-2 text-lg text-neutral/70">
                    Search, sort, and discover food shared by the community.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 p-6 bg-base-200/60 rounded-2xl shadow-md max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Search by food name..."
                    className="input-custom"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="input-custom"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort by</option>
                    <option value="expireDate">Expire Date</option>
                    <option value="quantity">Quantity</option>
                </select>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
                {filteredAndSortedFoods.map((food) => (
                    <FoodCard key={food._id} food={food} />
                ))}
            </motion.div>
        </div>
    );
};

export default AvailableFoods;
