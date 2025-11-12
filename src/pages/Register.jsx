import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const { register: regUser, register: _, login, googleLogin } = useAuth(); // register function is in context
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // password validations: uppercase, lowercase, min 6
    const pwd = data.password;
    if (!/[A-Z]/.test(pwd)) return toast.error("Password must include an uppercase letter");
    if (!/[a-z]/.test(pwd)) return toast.error("Password must include a lowercase letter");
    if (pwd.length < 6) return toast.error("Password must be at least 6 characters");

    try {
      // register from AuthProvider
      await regUser(data.name, data.email, data.password, data.photoURL);
      toast.success("Registered");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Registered with Google");
      navigate("/");
    } catch (err) {
      toast.error("Google auth failed");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <input {...register("name", { required: true })} placeholder="Full Name" className="input input-bordered" />
          <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered" />
          <input {...register("photoURL")} placeholder="Photo URL (optional)" className="input input-bordered" />
          <input {...register("password", { required: true })} type="password" placeholder="Password" className="input input-bordered" />
          <button className="btn btn-primary">Register</button>
        </form>
        <div className="mt-4">
          <button className="btn btn-outline w-full" onClick={handleGoogle}>Register with Google</button>
        </div>
        <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
