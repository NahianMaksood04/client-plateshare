import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const fetchMyFoods = async () => {
  const res = await axiosSecure.get("/foods/my/foods");
  return res.data;
};

const ManageMyFoods = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["myFoods"], fetchMyFoods);
  const deleteMutation = useMutation((id) => axiosSecure.delete(`/foods/${id}`), {
    onSuccess: () => {
      toast.success("Deleted");
      queryClient.invalidateQueries(["myFoods"]);
      queryClient.invalidateQueries(["availableFoods"]);
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Manage My Foods</h2>
      {data?.length ? (
        <div className="grid gap-4">
          {data.map((f) => (
            <div key={f._id} className="p-4 bg-white rounded shadow flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={f.food_image} alt={f.food_name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h4 className="font-semibold">{f.food_name}</h4>
                  <p className="text-sm text-gray-500">{f.food_quantity} • Expires: {new Date(f.expire_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/update-food/${f._id}`} className="btn btn-outline btn-sm">Update</Link>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => {
                    Swal.fire({
                      title: "Delete this food?",
                      showCancelButton: true,
                      confirmButtonText: "Delete",
                      icon: "warning"
                    }).then((res) => {
                      if (res.isConfirmed) deleteMutation.mutate(f._id);
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven't added any foods yet.</p>
      )}
    </div>
  );
};

export default ManageMyFoods;
