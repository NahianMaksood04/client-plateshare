import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getManageableFoods, deleteFood, getMyRequests } from '../api';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';
import { FaEdit, FaTrash, FaBoxOpen, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import UpdateFoodModal from '../components/UpdateFoodModal';

const MyDonations = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    const { data: foods = [], isLoading, isError, error } = useQuery({
        queryKey: ['manageableFoods'],
        queryFn: getManageableFoods,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteFood,
        onSuccess: () => {
            toast.success('Food deleted successfully!');
            queryClient.invalidateQueries(['manageableFoods']);
        },
        onError: (err) => toast.error(`Failed to delete food: ${err.message}`),
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this food item?')) {
            deleteMutation.mutate(id);
        }
    };

    const openUpdateModal = (food) => {
        setSelectedFood(food);
        setIsModalOpen(true);
    };

    if (isLoading) return <Loader />;
    if (isError) return <div className="text-center text-red-500 mt-4">Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="table w-full text-base">
                <thead className="text-lg">
                    <tr>
                        <th>Food</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map(food => (
                        <tr key={food._id} className="hover:bg-base-100/50">
                            <td>
                                <div className="flex items-center space-x-4">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16"><img src={food.foodImage} alt={food.foodName} /></div>
                                    </div>
                                    <div>
                                        <div className="font-bold font-heading">{food.foodName}</div>
                                        <div className="text-sm opacity-60">{food.pickupLocation}</div>
                                    </div>
                                </div>
                            </td>
                            <td>Serves {food.foodQuantity}</td>
                            <td><span className={`badge badge-lg ${food.foodStatus === 'Available' ? 'badge-success text-white' : 'badge-warning text-white'}`}>{food.foodStatus}</span></td>
                            <td className="space-x-2">
                                <button onClick={() => openUpdateModal(food)} className="btn btn-outline btn-secondary btn-sm rounded-full"><FaEdit /></button>
                                <button onClick={() => handleDelete(food._id)} className="btn btn-outline btn-error btn-sm rounded-full"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && <UpdateFoodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} food={selectedFood} />}
        </div>
    );
};

const MyRequests = () => {
    const { data: requests = [], isLoading, isError, error } = useQuery({
        queryKey: ['myFoodRequests'],
        queryFn: getMyRequests,
    });

    if (isLoading) return <Loader />;
    if (isError) return <div className="text-center text-red-500 mt-4">Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="table w-full text-base">
                <thead className="text-lg">
                    <tr>
                        <th>Food</th>
                        <th>Donator</th>
                        <th>Request Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request._id} className="hover:bg-base-100/50">
                            <td>
                                <div className="flex items-center space-x-4">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16"><img src={request.foodId?.foodImage} alt={request.foodId?.foodName} /></div>
                                    </div>
                                    <div>
                                        <div className="font-bold font-heading">{request.foodId?.foodName || 'N/A'}</div>
                                        <div className="text-sm opacity-60">Expires: {request.foodId ? new Date(request.foodId.expiredDateTime).toLocaleDateString() : 'N/A'}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{request.foodId?.donator.name || 'N/A'}</td>
                            <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                            <td>
                                <span className={`badge badge-lg ${request.status === 'pending' ? 'badge-info text-white' : request.status === 'accepted' ? 'badge-success text-white' : 'badge-error text-white'}`}>
                                    {request.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('donations');

    const { data: foods = [] } = useQuery({ queryKey: ['manageableFoods'], queryFn: getManageableFoods });
    const { data: requests = [] } = useQuery({ queryKey: ['myFoodRequests'], queryFn: getMyRequests });

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="card-custom md:flex-row mb-12 bg-base-200">
                <div className="p-8 flex items-center justify-center">
                    <img src={user?.photoURL} alt={user?.displayName} className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4" />
                </div>
                <div className="card-body">
                    <h2 className="card-title text-4xl font-heading">{user?.displayName}</h2>
                    <p className="text-base-content/60 text-lg">{user?.email}</p>
                    <div className="stats stats-vertical lg:stats-horizontal shadow mt-4 bg-transparent">
                        <div className="stat">
                            <div className="stat-figure text-secondary"><FaBoxOpen className="text-4xl" /></div>
                            <div className="stat-title font-heading text-lg">Total Donations</div>
                            <div className="stat-value text-primary">{foods.length}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-secondary"><FaPaperPlane className="text-4xl" /></div>
                            <div className="stat-title font-heading text-lg">Total Requests</div>
                            <div className="stat-value text-secondary">{requests.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-base-200/80 backdrop-blur-sm p-2 rounded-full flex items-center justify-center max-w-md mx-auto mb-10 shadow-inner">
                <button onClick={() => setActiveTab('donations')} className={`btn flex-1 rounded-full text-lg ${activeTab === 'donations' ? 'btn-primary text-white' : 'btn-ghost'}`}>My Donations</button>
                <button onClick={() => setActiveTab('requests')} className={`btn flex-1 rounded-full text-lg ${activeTab === 'requests' ? 'btn-primary text-white' : 'btn-ghost'}`}>My Requests</button>
            </div>

            <div className="card-custom bg-base-200 p-4 sm:p-8">
                {activeTab === 'donations' ? <MyDonations /> : <MyRequests />}
            </div>
        </div>
    );
};

export default Dashboard;
