import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosSecure from "../api/axiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

const uploadToImgbb = async (file) => {
  // read file as base64
  const dataUrl = await new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
  const base64 = dataUrl.split(",")[1];
  const form = new FormData();
  form.append("image", base64);
  const resp = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, form);
  return resp.data.data.url;
};

const AddFood = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const addFoodMutation = useMutation(
    (payload) => axiosSecure.post("/foods", payload),
    {
      onSuccess: () => {
        toast.success("Food added");
        queryClient.invalidateQueries(["availableFoods"]);
        reset();
      },
      onError: (err) => toast.error(err?.response?.data?.message || "Failed to add food")
    }
  );

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      const file = data.food_image[0];
      const imageUrl = await uploadToImgbb(file);

      const payload = {
        food_name: data.food_name,
        food_image: imageUrl,
        food_quantity: data.food_quantity,
        pickup_location: data.pickup_location,
        expire_date: data.expire_date,
        additional_notes: data.additional_notes || ""
      };

      addFoodMutation.mutate(payload);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Add Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl bg-white p-6 rounded shadow">
        <input {...register("food_name", { required: true })} placeholder="Food name" className="input input-bordered w-full mb-3" />
        <input type="file" {...register("food_image", { required: true })} accept="image/*" className="w-full mb-3" />
        <input {...register("food_quantity", { required: true })} placeholder='Food quantity e.g. "Serves 4 people"' className="input input-bordered w-full mb-3" />
        <input {...register("pickup_location", { required: true })} placeholder="Pickup location" className="input input-bordered w-full mb-3" />
        <input type="date" {...register("expire_date", { required: true })} className="input input-bordered w-full mb-3" />
        <textarea {...register("additional_notes")} placeholder="Additional notes" className="textarea textarea-bordered w-full mb-3" />
        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Food"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => reset()}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
