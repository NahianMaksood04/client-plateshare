import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFoodById } from '../api/foods';
import { createRequest, getRequestsForFood, updateRequestStatus } from '../api/requests';
import Loader from '../components/ui/Loader';
import RequestModal from '../components/RequestModal';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function FoodDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: food, isLoading } = useQuery(['food', id], () => fetchFoodById(id), {
    retry: 1
  });

  const { data: requests, refetch: refetchRequests } = useQuery(
    ['foodRequests', id],
    () => getRequestsForFood(id),
    {
      enabled: !!food && food.donator_email === (user?.email || ''),
      retry: 1
    }
  );

  const requestMutation = useMutation(({ location, reason, contact_no }) => createRequest(id, { location, reason, contact_no }), {
    onSuccess: () => {
      toast.success('Request submitted');
      setModalOpen(false);
      queryClient.invalidateQueries(['food', id]);
    },
    onError: (err) => toast.error(err.message || 'Request failed')
  });

  const updateStatus = useMutation(({ requestId, action }) => updateRequestStatus(requestId, action), {
    onSuccess: () => {
      toast.success('Request updated');
      refetchRequests();
      queryClient.invalidateQueries(['food', id]);
    }
  });

  if (isLoading) return <Loader />;

  if (!food) return <div className="container mx-auto p-6">Food not found</div>;

  const handleRequest = (payload) => {
    requestMutation.mutate(payload);
  };

  const handleAccept = (reqId) => updateStatus.mutate({ requestId: reqId, action: 'accept' });
  const handleReject = (reqId) => updateStatus.mutate({ requestId: reqId, action: 'reject' });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img src={food.food_image} alt={food.food_name} className="w-full h-96 object-cover rounded" />
          <h1 className="text-2xl font-semibold mt-4">{food.food_name}</h1>
          <p className="text-sm text-muted mt-2">Serves: {food.food_quantity}</p>
          <p className="mt-3">{food.additional_notes}</p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => setModalOpen(true)} className="btn btn-primary">Request Food</button>
            {user?.email === food.donator_email && (
              <Link to={`/update-food/${food._id}`} className="btn btn-outline">Edit</Link>
            )}
          </div>

          {/* Owner's Request Table */}
          {user?.email === food.donator_email && (
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Requests</h3>
              {(requests || []).length === 0 ? (
                <div className="text-muted">No requests yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Requester</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map(r => (
                        <tr key={r._id}>
                          <td>
                            <div className="flex items-center gap-2">
                              <img src={r.requester_image || `https://ui-avatars.com/api/?name=${r.requester_name}`} className="w-8 h-8 rounded-full" />
                              <div>
                                <div className="font-medium">{r.requester_name}</div>
                                <div className="text-xs text-muted">{r.requester_email}</div>
                              </div>
                            </div>
                          </td>
                          <td>{r.contact_no}</td>
                          <td>{r.location}</td>
                          <td className="max-w-xs">{r.reason}</td>
                          <td>{r.status}</td>
                          <td className="flex gap-2">
                            <button onClick={() => handleAccept(r._id)} className="btn btn-sm btn-success">Accept</button>
                            <button onClick={() => handleReject(r._id)} className="btn btn-sm btn-warning">Reject</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <aside>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">Pickup Location</h4>
            <div className="text-sm text-muted">{food.pickup_location}</div>
            <h4 className="font-semibold mt-3">Expires</h4>
            <div className="text-sm text-muted">{new Date(food.expire_date).toLocaleString()}</div>
            <h4 className="font-semibold mt-3">Donated by</h4>
            <div className="flex items-center gap-2 mt-2">
              <img src={food.donator_image || `https://ui-avatars.com/api/?name=${food.donator_name}`} className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-medium">{food.donator_name}</div>
                <div className="text-xs text-muted">{food.donator_email}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <RequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleRequest} />
    </div>
  );
}
