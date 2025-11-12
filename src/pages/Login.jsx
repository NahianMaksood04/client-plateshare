import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Logged in");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <input {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
          <input {...register("password", { required: true })} type="password" placeholder="Password" className="input input-bordered" />
          <button className="btn btn-primary">Login</button>
        </form>
        <div className="mt-4">
          <button className="btn btn-outline w-full" onClick={handleGoogle}>Login with Google</button>
        </div>
        <p className="mt-4 text-sm">Don’t have an account? <Link to="/register" className="text-primary">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
