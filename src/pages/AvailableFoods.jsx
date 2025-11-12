import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllAvailableFoods } from '../api/foods';
import FoodCard from '../components/FoodCard';
import Loader from '../components/ui/Loader';

export default function AvailableFoods() {
  const { data, isLoading } = useQuery(['availableFoods'], fetchAllAvailableFoods);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Available Foods</h2>
      {(!data || data.length === 0) ? (
        <div className="text-center text-muted py-12">No foods available right now.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {data.map(food => <FoodCard key={food._id} food={food} />)}
        </div>
      )}
    </div>
  );
}
