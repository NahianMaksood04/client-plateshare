import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import RequestModal from "../components/RequestModal";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import toast from "react-hot-toast";

export default function FoodDetails() {
  const { id } = useParams();
  const api = useAxios();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => (await api.get(`/api/foods/${id}`)).data,
  });

  const isOwner = user?.email && data?.donator?.email === user?.email;

  const { data: requests, refetch, isFetching: loadingReq } = useQuery({
    queryKey: ["requests", id],
    enabled: !!isOwner,
    queryFn: async () => (await api.get(`/api/requests/food/${id}`)).data,
  });

  const acceptMutation = useMutation({
    mutationFn: async (rid) => (await api.patch(`/api/requests/${rid}/accept`)).data,
    onSuccess: () => {
      toast.success("Request accepted");
      qc.invalidateQueries({ queryKey: ["food", id] });
      refetch();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (rid) => (await api.patch(`/api/requests/${rid}/reject`)).data,
    onSuccess: () => {
      toast.success("Request rejected");
      refetch();
    },
  });

  if (isLoading) return <Loader />;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={data.image} className="w-full rounded-xl border object-cover" />
        <div>
          <h1 className="font-display text-3xl font-extrabold">{data.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <img
              src={data.donator?.photo || "https://i.pravatar.cc/100?img=12"}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-medium">{data.donator?.name}</p>
              <p className="text-sm text-neutral/60">{data.donator?.email}</p>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p>
              Serves <b>{data.quantity}</b> {data.quantity > 1 ? "people" : "person"}
            </p>
            <p>
              Pickup: <b>{data.pickupLocation}</b>
            </p>
            <p>
              Expires: <b>{new Date(data.expireDate).toLocaleDateString()}</b>
            </p>
            {data.notes && <p className="text-neutral/80 mt-2">{data.notes}</p>}
            <p className="mt-2">
              Status:{" "}
              <span
                className={`badge ${
                  data.food_status === "Available" ? "badge-success" : "badge-neutral"
                }`}
              >
                {data.food_status}
              </span>
            </p>
          </div>

          {!isOwner && data.food_status === "Available" && (
            <button onClick={() => setOpen(true)} className="btn btn-primary mt-6">
              Request Food
            </button>
          )}
        </div>
      </div>

      {/* Requests Table (Owner only) */}
      {isOwner && (
        <div className="mt-12">
          <h2 className="font-display text-2xl font-extrabold mb-4">Food Requests</h2>
          {loadingReq ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Requester</th>
                    <th>Location</th>
                    <th>Reason</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests?.map((r) => (
                    <tr key={r._id}>
                      <td className="flex items-center gap-3">
                        <img
                          src={r.requester?.photo || "https://i.pravatar.cc/100?img=15"}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{r.requester?.name}</div>
                          <div className="text-xs text-neutral/60">{r.requester?.email}</div>
                        </div>
                      </td>
                      <td>{r.location}</td>
                      <td className="max-w-xs">{r.reason}</td>
                      <td>{r.contact}</td>
                      <td>
                        <span
                          className={`badge ${
                            r.status === "pending"
                              ? "badge-warning"
                              : r.status === "accepted"
                              ? "badge-success"
                              : "badge-neutral"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="text-right">
                        {r.status === "pending" && (
                          <>
                            <button
                              onClick={() => acceptMutation.mutate(r._id)}
                              className="btn btn-xs btn-success mr-2"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => rejectMutation.mutate(r._id)}
                              className="btn btn-xs btn-error"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {requests?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-neutral/70">
                        No requests yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {open && <RequestModal foodId={id} onClose={() => setOpen(false)} />}
    </section>
  );
}
