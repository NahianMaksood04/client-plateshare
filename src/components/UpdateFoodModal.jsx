import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFood } from '../api';
import toast from 'react-hot-toast';

const UpdateFoodModal = ({ isOpen, onClose, food }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...food,
            expiredDateTime: food.expiredDateTime.split('T')[0], // Format for date input
        },
    });
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (updatedFood) => updateFood(food._id, updatedFood),
        onSuccess: () => {
            toast.success('Food updated successfully!');
            queryClient.invalidateQueries(['manageableFoods']);
            onClose();
        },
        onError: (error) => {
            toast.error(`Update failed: ${error.message}`);
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open modal-bottom sm:modal-middle">
            <div className="modal-box bg-base-200 rounded-t-2xl sm:rounded-2xl w-11/12 max-w-4xl">
                <h3 className="font-bold text-2xl font-heading">Update Food Item</h3>
                <p className="py-2 text-base-content/70">Edit the details of your food donation.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Food Name</span></label>
                            <input type="text" {...register("foodName", { required: true })} className="input-custom bg-base-100" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Food Quantity (servings)</span></label>
                            <input type="number" {...register("foodQuantity", { required: true, min: 1 })} className="input-custom bg-base-100" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Pickup Location</span></label>
                            <input type="text" {...register("pickupLocation", { required: true })} className="input-custom bg-base-100" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Expire Date</span></label>
                            <input type="date" {...register("expiredDateTime", { required: true })} className="input-custom bg-base-100" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Additional Notes</span></label>
                        <textarea {...register("additionalNotes")} className="textarea textarea-bordered h-24 rounded-2xl bg-base-100"></textarea>
                    </div>
                    <div className="modal-action mt-6">
                        <button type="button" className="btn btn-ghost rounded-full" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary rounded-full px-6" disabled={mutation.isLoading}>
                            {mutation.isLoading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateFoodModal;
