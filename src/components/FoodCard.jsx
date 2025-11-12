import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FoodCard({ food }) {
  return (
    <motion.div className="card card-compact w-full bg-base-100 shadow-md hover:shadow-xl transition"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <figure><img src={food.food_image} alt={food.food_name} className="object-cover h-48 w-full" /></figure>
      <div className="card-body">
        <h2 className="card-title">{food.food_name}</h2>
        <p className="text-sm">Serves: {food.food_quantity}</p>
        <div className="flex items-center gap-2 mt-2">
          <img src={food.donator_image || `https://ui-avatars.com/api/?name=${food.donator_name}`} alt="donator" className="w-8 h-8 rounded-full" />
          <div>
            <div className="text-sm font-medium">{food.donator_name}</div>
            <div className="text-xs text-muted">{new Date(food.expire_date).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="card-actions justify-end mt-3">
          <Link to={`/food/${food._id}`} className="btn btn-outline btn-sm">View Details</Link>
        </div>
      </div>
    </motion.div>
  );
}
