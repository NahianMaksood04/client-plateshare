import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadToImgbb } from '../utils/imgbb';
import { createFood } from '../api/foods';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddFood() {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload) => createFood(payload),
    onSuccess: (data) => {
      toast.success('Food added');
      queryClient.invalidateQueries({ queryKey: ['foods'] }); // invalidate if you have a foods query
      navigate('/manage-foods');
    },
    onError: (err) => toast.error(err.message || 'Failed to add')
  });

  const onSubmit = async (form) => {
    try {
      setLoading(true);
      const file = form.food_image[0];
      const imageUrl = await uploadToImgbb(file);

      const payload = {
        food_name: form.food_name,
        food_image: imageUrl,
        food_quantity: form.food_quantity,
        pickup_location: form.pickup_location,
        expire_date: form.expire_date,
        additional_notes: form.additional_notes,
        // donator info will be filled by backend using token
      };

      mutation.mutate(payload);
    } catch (err) {
      toast.error(err.message || 'Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Add Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
        <div>
          <label className="label">Food Name</label>
          <input {...register('food_name', { required: true })} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Food Quantity (e.g., Serves 3 people)</label>
          <input {...register('food_quantity', { required: true })} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Pickup Location</label>
          <input {...register('pickup_location', { required: true })} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Expire Date</label>
          <input type="datetime-local" {...register('expire_date', { required: true })} className="input input-bordered w-full" />
        </div>
        <div className="md:col-span-2">
          <label className="label">Food Image</label>
          <input type="file" accept="image/*" {...register('food_image', { required: true })} className="file-input file-input-bordered w-full" />
        </div>
        <div className="md:col-span-2">
          <label className="label">Additional Notes</label>
          <textarea {...register('additional_notes')} className="textarea textarea-bordered w-full"></textarea>
        </div>
        <div className="md:col-span-2 flex justify-end gap-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Food'}</button>
        </div>
      </form>
    </div>
  );
}
