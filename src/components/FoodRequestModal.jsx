import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createRequest } from '../api'; // Make sure this points to your API function

const FoodRequestModal = ({ isOpen, onClose, food }) => {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            pickupLocation: food?.pickupLocation || "",
        },
    });

    const mutation = useMutation({
        mutationFn: createRequest,
        onSuccess: () => {
            toast.success('Food request submitted successfully!');
            queryClient.invalidateQueries(['myFoodRequests']);
            reset();
            onClose();
        },
        onError: (error) => {
            toast.error(`Failed to submit request: ${error.message}`);
        }
    });

    const onSubmit = (data) => {
        if (!food?._id) {
            toast.error("Invalid food selected.");
            return;
        }

        // Only send the fields backend expects
        const requestData = {
            foodId: food._id,
            pickupLocation: data.pickupLocation,
            whyNeedFood: data.whyNeedFood,
            contactNumber: data.contactNumber
        };

        mutation.mutate(requestData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open modal-bottom sm:modal-middle">
            <div className="modal-box bg-base-200 rounded-t-2xl sm:rounded-2xl">
                <h3 className="font-bold text-2xl font-heading">Request This Food</h3>
                <p className="py-2 text-base-content/70">Fill out the details below to submit your request.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    {/* Pickup Location */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Pickup Location</span></label>
                        <input
                            type="text"
                            {...register("pickupLocation", { required: "Pickup location is required" })}
                            className="input-custom bg-base-100"
                        />
                        {errors.pickupLocation && <span className="text-error text-sm mt-1">{errors.pickupLocation.message}</span>}
                    </div>

                    {/* Reason */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Why do you need this food?</span></label>
                        <textarea
                            {...register("whyNeedFood", { required: "This field is required" })}
                            className="textarea textarea-bordered h-24 rounded-2xl bg-base-100"
                        ></textarea>
                        {errors.whyNeedFood && <span className="text-error text-sm mt-1">{errors.whyNeedFood.message}</span>}
                    </div>

                    {/* Contact Number */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Contact Number</span></label>
                        <input
                            type="tel"
                            {...register("contactNumber", { required: "Contact number is required" })}
                            className="input-custom bg-base-100"
                        />
                        {errors.contactNumber && <span className="text-error text-sm mt-1">{errors.contactNumber.message}</span>}
                    </div>

                    {/* Buttons */}
                    <div className="modal-action mt-6">
                        <button type="button" className="btn btn-ghost rounded-full" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary rounded-full px-6" disabled={mutation.isLoading}>
                            {mutation.isLoading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FoodRequestModal;
