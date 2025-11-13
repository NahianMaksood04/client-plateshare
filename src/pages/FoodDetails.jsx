import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFoodById, getRequestsForFood, acceptRequest, rejectRequest } from '../api';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';
import FoodRequestModal from '../components/FoodRequestModal';
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaStickyNote, FaCheck, FaTimes } from 'react-icons/fa';

const FoodDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    const { data: food, isLoading, isError, error } = useQuery({
        queryKey: ['food', id],
        queryFn: () => getFoodById(id),
    });

    const { data: requests = [] } = useQuery({
        queryKey: ['requestsForFood', id],
        queryFn: () => getRequestsForFood(id),
        enabled: !!user && !!food && user.email === food.donator.email,
    });

    const acceptMutation = useMutation({
        mutationFn: acceptRequest,
        onSuccess: () => {
            toast.success('Request Accepted!');
            queryClient.invalidateQueries(['requestsForFood', id]);
            queryClient.invalidateQueries(['food', id]);
        }
    });

    const rejectMutation = useMutation({
        mutationFn: rejectRequest,
        onSuccess: () => {
            toast.success('Request Rejected.');
            queryClient.invalidateQueries(['requestsForFood', id]);
        }
    });

    if (isLoading) return <Loader />;
    if (isError) return <div className="text-center text-red-500">Error: {error.message}</div>;

    const isOwner = user && user.email === food.donator.email;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="card-custom flex flex-col lg:flex-row bg-base-200 overflow-visible">
                <figure className="lg:w-1/2 p-6">
                    <img src={food.foodImage} alt={food.foodName} className="w-full h-full object-cover rounded-2xl shadow-lg" />
                </figure>
                <div className="card-body lg:w-1/2 p-8">
                    <div className="flex items-start justify-between">
                        <h2 className="card-title text-4xl font-heading font-bold text-neutral">{food.foodName}</h2>
                        <span className={`badge badge-lg ${food.foodStatus === 'Available' ? 'badge-success text-white' : 'badge-warning text-white'}`}>{food.foodStatus}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 my-4 border-y py-4">
                        <div className="avatar">
                            <div className="w-16 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                                <img src={food.donator.image} alt={food.donator.name} />
                            </div>
                        </div>
                        <div>
                            <p className="text-neutral/60">Donated by:</p>
                            <p className="font-semibold font-heading text-xl">{food.donator.name}</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-lg">
                        <p className="flex items-center gap-3"><FaUsers className="text-primary" /> <span>Serves {food.foodQuantity} people</span></p>
                        <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-primary" /> <span>{food.pickupLocation}</span></p>
                        <p className="flex items-center gap-3"><FaCalendarAlt className="text-primary" /> <span>Expires on {new Date(food.expiredDateTime).toLocaleDateString()}</span></p>
                        {food.additionalNotes && <p className="flex items-start gap-3 pt-2"><FaStickyNote className="text-primary mt-1" /> <span>{food.additionalNotes}</span></p>}
                    </div>

                    <div className="card-actions justify-end mt-6">
                        {food.foodStatus === 'Available' && !isOwner && (
                            <button onClick={() => setIsRequestModalOpen(true)} className="btn btn-primary btn-lg rounded-full px-8">Request Food</button>
                        )}
                    </div>
                </div>
            </div>

            {isOwner && (
                <div className="mt-16 card-custom bg-base-200 p-8">
                    <h3 className="text-3xl font-bold font-heading text-center mb-8">Food Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full text-base">
                            <thead className="text-lg">
                                <tr>
                                    <th>Requester</th>
                                    <th>Reason & Contact</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req._id} className="hover:bg-base-100/50">
                                        <td>
                                            <div className="flex items-center space-x-4">
                                                <div className="avatar"><div className="mask mask-squircle w-16 h-16"><img src={req.requesterPhoto} alt={req.requesterName} /></div></div>
                                                <div>
                                                    <div className="font-bold font-heading">{req.requesterName}</div>
                                                    <div className="text-sm opacity-60">{req.requesterEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{req.requestReason}</p>
                                            <p className="font-bold text-primary">{req.contactNo}</p>
                                        </td>
                                        <td className="space-x-2">
                                            {req.status === 'pending' ? (
                                                <>
                                                    <button onClick={() => acceptMutation.mutate(req._id)} className="btn btn-success btn-sm rounded-full text-white"><FaCheck /> Accept</button>
                                                    <button onClick={() => rejectMutation.mutate(req._id)} className="btn btn-error btn-sm rounded-full text-white"><FaTimes /> Reject</button>
                                                </>
                                            ) : <span className={`badge badge-lg ${req.status === 'accepted' ? 'badge-success text-white' : 'badge-error text-white'}`}>{req.status}</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <FoodRequestModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                food={food}
            />
        </div>
    );
};

export default FoodDetails;
