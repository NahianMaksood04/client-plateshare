import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const fetchFoodDetails = async (id) => {
  const res = await axiosSecure.get(`/foods/${id}`);
  return res.data;
};

const fetchRequestsForFood = async (foodId) => {
  const res = await axiosSecure.get(`/requests/food/${foodId}`);
  return res.data;
};

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showRequestForm, setShowRequestForm] = useState(false);

  const { data: food, isLoading } = useQuery(["food", id], () => fetchFoodDetails(id));
  const { data: requests = [], refetch: refetchRequests } = useQuery(["requests", id], () => fetchRequestsForFood(id), {
    enabled: !!food && food.donator_email === user?.email // only fetch if owner
  });

  const { register, handleSubmit, reset } = useForm();

  const requestMutation = useMutation(
    (payload) => axiosSecure.post(`/requests/${id}`, payload),
    {
      onSuccess: () => {
        toast.success("Request submitted");
        setShowRequestForm(false);
        reset();
        // refetch requests and food
        refetchRequests();
      },
      onError: (err) => toast.error(err?.response?.data?.message || "Request failed")
    }
  );

  const updateRequestStatus = useMutation(
    ({ requestId, action }) => axiosSecure.patch(`/requests/${requestId}/status`, { action }),
    {
      onSuccess: () => {
        toast.success("Status updated");
        queryClient.invalidateQueries(["food", id]);
        refetchRequests();
      },
      onError: (err) => toast.error("Action failed")
    }
  );

  if (isLoading) return <LoadingSpinner />;

  if (!food) return <p className="p-6">Food not found.</p>;

  const onSubmitRequest = (data) => {
    requestMutation.mutate({
      location: data.location,
      reason: data.reason,
      contact_no: data.contact_no
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img src={food.food_image} alt={food.food_name} className="w-full h-96 object-cover rounded-md" />
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold">{food.food_name}</h2>
            <p className="text-sm text-gray-600 mt-1">Donated by: {food.donator_name}</p>
            <p className="mt-3">{food.additional_notes || "No additional notes."}</p>
            <div className="mt-4 flex gap-3">
              <button className="btn btn-primary" onClick={() => setShowRequestForm(!showRequestForm)}>
                Request Food
              </button>
              <span className="py-2 px-3 rounded bg-gray-100">{food.food_quantity}</span>
              <span className="py-2 px-3 rounded bg-gray-100">Pickup: {food.pickup_location}</span>
            </div>

            {showRequestForm && (
              <form onSubmit={handleSubmit(onSubmitRequest)} className="mt-4 grid gap-3">
                <input {...register("location", { required: true })} placeholder="Your location" className="input input-bordered" />
                <textarea {...register("reason", { required: true })} placeholder="Why do you need the food?" className="textarea textarea-bordered" />
                <input {...register("contact_no", { required: true })} placeholder="Contact number" className="input input-bordered" />
                <div className="flex gap-3">
                  <button type="submit" className="btn btn-success">Submit Request</button>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowRequestForm(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>

          {/* Requests Table (only owner) */}
          {food.donator_email === user?.email && (
            <div className="mt-6 bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">Requests</h3>
              {requests?.length ? (
                <div className="overflow-x-auto mt-3">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Requester</th>
                        <th>Location</th>
                        <th>Contact</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((r) => (
                        <tr key={r._id}>
                          <td>
                            <div className="flex items-center gap-2">
                              <img src={r.requester_image || "/default.png"} alt={r.requester_name} className="w-8 h-8 rounded-full" />
                              <span>{r.requester_name}</span>
                            </div>
                          </td>
                          <td>{r.location}</td>
                          <td>{r.contact_no}</td>
                          <td>{r.reason}</td>
                          <td>{r.status}</td>
                          <td>
                            <div className="flex gap-2">
                              <button className="btn btn-sm btn-success" onClick={() => updateRequestStatus.mutate({ requestId: r._id, action: "accept" })}>Accept</button>
                              <button className="btn btn-sm btn-error" onClick={() => {
                                Swal.fire({
                                  title: "Reject request?",
                                  showCancelButton: true,
                                  confirmButtonText: "Reject",
                                  icon: "warning"
                                }).then((res) => {
                                  if (res.isConfirmed) updateRequestStatus.mutate({ requestId: r._id, action: "reject" });
                                });
                              }}>Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 mt-2">No requests yet.</p>
              )}
            </div>
          )}
        </div>

        <aside className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Donator</h4>
          <div className="flex items-center gap-3 mt-3">
            <img src={food.donator_image || "/default.png"} className="w-16 h-16 rounded-full object-cover" alt={food.donator_name} />
            <div>
              <p className="font-semibold">{food.donator_name}</p>
              <p className="text-sm text-gray-500">{food.donator_email}</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Quantity:</strong> {food.food_quantity}</p>
            <p className="mt-2"><strong>Pickup:</strong> {food.pickup_location}</p>
            <p className="mt-2"><strong>Expires:</strong> {new Date(food.expire_date).toLocaleDateString()}</p>
            <p className="mt-2"><strong>Status:</strong> {food.food_status}</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FoodDetails;
