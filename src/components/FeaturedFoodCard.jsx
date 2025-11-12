import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const FeaturedFoodCard = ({ food }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={cardVariants} className="card-custom group">
            <figure className="h-56 overflow-hidden">
                <img src={food.foodImage} alt={food.foodName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </figure>
            <div className="card-body p-5">
                <div className="flex items-start justify-between">
                    <h2 className="card-title font-heading text-2xl font-bold text-neutral">{food.foodName}</h2>
                    <div className="avatar">
                        <div className="w-12 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                            <img src={food.donator.image} alt={food.donator.name} />
                        </div>
                    </div>
                </div>
                <p className="text-sm text-neutral/70 -mt-2">by {food.donator.name}</p>
                
                <div className="flex items-center gap-4 text-neutral/80 my-3">
                    <div className="flex items-center gap-2">
                        <FaUsers className="text-secondary" />
                        <span>Serves {food.foodQuantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-secondary" />
                        <span>{food.pickupLocation}</span>
                    </div>
                </div>

                <div className="card-actions justify-end mt-2">
                    <Link to={`/food/${food._id}`} className="btn btn-primary rounded-full px-6">View Details</Link>
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedFoodCard;
