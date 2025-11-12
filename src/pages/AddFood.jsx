import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFood, uploadImage } from '../api';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addFood,
        onSuccess: () => {
            toast.success('Food added successfully!');
            queryClient.invalidateQueries(['manageableFoods']);
            reset();
            navigate('/dashboard');
        },
        onError: (error) => {
            toast.error(`Failed to add food: ${error.message}`);
        }
    });

    const onSubmit = async (data) => {
        try {
            const imageUrl = await uploadImage(data.foodImage[0]);
            const foodData = {
                ...data,
                foodImage: imageUrl,
                foodQuantity: parseInt(data.foodQuantity, 10),
                donator: {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                },
            };
            mutation.mutate(foodData);
        } catch (error) {
            toast.error(`Image upload failed: ${error.message}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold font-heading">Share a New Food Item</h1>
                    <p className="mt-2 text-lg text-neutral/70">Your contribution can make someone's day.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-custom bg-base-200 p-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Food Name</span></label>
                            <input type="text" {...register("foodName", { required: true })} className="input-custom" />
                            {errors.foodName && <span className="text-error text-sm mt-1">Food name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Food Image</span></label>
                            <input type="file" {...register("foodImage", { required: true })} className="file-input file-input-bordered w-full rounded-full bg-base-100" />
                            {errors.foodImage && <span className="text-error text-sm mt-1">Food image is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Food Quantity (servings)</span></label>
                            <input type="number" {...register("foodQuantity", { required: true, min: 1 })} className="input-custom" />
                            {errors.foodQuantity && <span className="text-error text-sm mt-1">Quantity is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Pickup Location</span></label>
                            <input type="text" {...register("pickupLocation", { required: true })} className="input-custom" />
                            {errors.pickupLocation && <span className="text-error text-sm mt-1">Pickup location is required</span>}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Expire Date</span></label>
                        <input type="date" {...register("expiredDateTime", { required: true })} className="input-custom" />
                        {errors.expiredDateTime && <span className="text-error text-sm mt-1">Expire date is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Additional Notes</span></label>
                        <textarea {...register("additionalNotes")} className="textarea textarea-bordered h-24 rounded-2xl bg-base-100"></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary btn-lg rounded-full text-white" disabled={mutation.isLoading}>
                            {mutation.isLoading ? 'Adding Food...' : 'Add Food Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFood;
