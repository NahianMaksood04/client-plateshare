import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchFoodById, updateFood } from '../api/foods';
import { useForm } from 'react-hook-form';
import Loader from '../components/ui/Loader';
import { uploadToImgbb } from '../utils/imgbb';
import toast from 'react-hot-toast';

export default function UpdateFood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: food, isLoading } = useQuery(['food', id], () => fetchFoodById(id));
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation(({ id, payload }) => updateFood(id, payload), {
    onSuccess: () => {
      toast.success('Food updated');
      navigate('/manage-foods');
    }
  });

  React.useEffect(() => {
    if (food) {
      reset({
        food_name: food.food_name,
        food_quantity: food.food_quantity,
        pickup_location: food.pickup_location,
        expire_date: new Date(food.expire_date).toISOString().slice(0, 16),
        additional_notes: food.additional_notes || ''
      });
    }
  }, [food, reset]);

  if (isLoading) return <Loader />;

  const onSubmit = async (form) => {
    try {
      let imageUrl = food.food_image;
      if (form.food_image && form.food_image.length > 0) {
        imageUrl = await uploadToImgbb(form.food_image[0]);
      }
      const payload = {
        food_name: form.food_name,
        food_image: imageUrl,
        food_quantity: form.food_quantity,
        pickup_location: form.pickup_location,
        expire_date: form.expire_date,
        additional_notes: form.additional_notes
      };
      mutation.mutate({ id, payload });
    } catch (err) {
      toast.error(err.message || 'Update failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Update Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
        <div>
          <label className="label">Food Name</label>
          <input {...register('food_name')} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Food Quantity</label>
          <input {...register('food_quantity')} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Pickup Location</label>
          <input {...register('pickup_location')} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Expire Date</label>
          <input type="datetime-local" {...register('expire_date')} className="input input-bordered w-full" />
        </div>
        <div className="md:col-span-2">
          <label className="label">Replace Image (optional)</label>
          <input type="file" accept="image/*" {...register('food_image')} className="file-input file-input-bordered w-full" />
        </div>
        <div className="md:col-span-2">
          <label className="label">Notes</label>
          <textarea {...register('additional_notes')} className="textarea textarea-bordered w-full"></textarea>
        </div>
        <div className="md:col-span-2 flex justify-end gap-3">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
}
