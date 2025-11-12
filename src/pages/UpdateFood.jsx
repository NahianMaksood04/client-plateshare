import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import axios from "axios";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

const fetchFood = async (id) => {
  const res = await axiosSecure.get(`/foods/${id}`);
  return res.data;
};

const uploadToImgbb = async (file) => {
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

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: food, isLoading } = useQuery(["foodForUpdate", id], () => fetchFood(id));
  const { register, handleSubmit, reset, setValue } = useForm();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (food) {
      setValue("food_name", food.food_name);
      setValue("food_quantity", food.food_quantity);
      setValue("pickup_location", food.pickup_location);
      setValue("expire_date", new Date(food.expire_date).toISOString().slice(0, 10));
      setValue("additional_notes", food.additional_notes);
    }
  }, [food]);

  const updateMutation = useMutation((payload) => axiosSecure.patch(`/foods/${id}`, payload), {
    onSuccess: () => {
      toast.success("Updated");
      queryClient.invalidateQueries(["myFoods"]);
      queryClient.invalidateQueries(["availableFoods"]);
      navigate("/manage-my-foods");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let imageUrl = food.food_image;
      if (data.food_image?.length) {
        imageUrl = await uploadToImgbb(data.food_image[0]);
      }
      const payload = {
        food_name: data.food_name,
        food_image: imageUrl,
        food_quantity: data.food_quantity,
        pickup_location: data.pickup_location,
        expire_date: data.expire_date,
        additional_notes: data.additional_notes,
      };
      updateMutation.mutate(payload);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Update Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl bg-white p-6 rounded shadow">
        <input {...register("food_name", { required: true })} className="input input-bordered w-full mb-3" />
        <input type="file" {...register("food_image")} accept="image/*" className="w-full mb-3" />
        <input {...register("food_quantity", { required: true })} className="input input-bordered w-full mb-3" />
        <input {...register("pickup_location", { required: true })} className="input input-bordered w-full mb-3" />
        <input type="date" {...register("expire_date", { required: true })} className="input input-bordered w-full mb-3" />
        <textarea {...register("additional_notes")} className="textarea textarea-bordered w-full mb-3" />
        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary" disabled={uploading}>
            {uploading ? "Updating..." : "Update Food"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFood;
