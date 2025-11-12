import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const fetchMyFoods = async () => {
  const res = await axiosSecure.get("/foods/my/foods");
  return res.data;
};

const MyFoodRequests = () => {
  const { data, isLoading } = useQuery(["myFoodsForRequests"], fetchMyFoods);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">My Food Requests</h2>
      {data?.length ? (
        <div className="grid gap-4">
          {data.map((f) => (
            <div key={f._id} className="p-4 bg-white rounded shadow flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={f.food_image} alt={f.food_name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h4 className="font-semibold">{f.food_name}</h4>
                  <p className="text-sm text-gray-500">{f.food_quantity}</p>
                </div>
              </div>
              <Link to={`/food/${f._id}`} className="btn btn-outline btn-sm">View Requests</Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have no posted foods yet.</p>
      )}
    </div>
  );
};

export default MyFoodRequests;
