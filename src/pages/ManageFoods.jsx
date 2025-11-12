import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFoodsByDonator, deleteFood } from '../api/foods';
import { Link } from 'react-router-dom';
import Loader from '../components/ui/Loader';
import toast from 'react-hot-toast';

export default function ManageFoods() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['myFoods'], fetchFoodsByDonator);
  const delMutation = useMutation((id) => deleteFood(id), {
    onSuccess: () => {
      toast.success('Food deleted');
      queryClient.invalidateQueries(['myFoods']);
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage My Foods</h2>
        <Link to="/add-food" className="btn btn-primary btn-sm">Add Food</Link>
      </div>

      {(!data || data.length === 0) ? (
        <div className="text-muted">You have not added any food yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Expires</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item._id}>
                  <td><img src={item.food_image} className="w-20 h-14 object-cover rounded" /></td>
                  <td>{item.food_name}</td>
                  <td>{item.food_quantity}</td>
                  <td>{new Date(item.expire_date).toLocaleString()}</td>
                  <td>{item.food_status}</td>
                  <td className="flex gap-2">
                    <Link to={`/update-food/${item._id}`} className="btn btn-sm btn-outline">Update</Link>
                    <button onClick={() => {
                      if (confirm('Delete this food?')) delMutation.mutate(item._id);
                    }} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
