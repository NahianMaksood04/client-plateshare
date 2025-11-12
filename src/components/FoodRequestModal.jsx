import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRequest } from '../api';
import toast from 'react-hot-toast';

const FoodRequestModal = ({ isOpen, onClose, foodId }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const queryClient = useQueryClient();

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
        mutation.mutate({ ...data, foodId });
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open modal-bottom sm:modal-middle">
            <div className="modal-box bg-base-200 rounded-t-2xl sm:rounded-2xl">
                <h3 className="font-bold text-2xl font-heading">Request This Food</h3>
                <p className="py-2 text-base-content/70">Fill out the details below to submit your request.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Your Location</span></label>
                        <input type="text" {...register("requestLocation", { required: true })} className="input-custom bg-base-100" />
                        {errors.requestLocation && <span className="text-error text-sm mt-1">Location is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Why do you need this food?</span></label>
                        <textarea {...register("requestReason", { required: true })} className="textarea textarea-bordered h-24 rounded-2xl bg-base-100"></textarea>
                        {errors.requestReason && <span className="text-error text-sm mt-1">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Contact Number</span></label>
                        <input type="tel" {...register("contactNo", { required: true })} className="input-custom bg-base-100" />
                        {errors.contactNo && <span className="text-error text-sm mt-1">Contact number is required</span>}
                    </div>
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
