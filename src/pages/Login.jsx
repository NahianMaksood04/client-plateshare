import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Login() {
  const { register: registerField, handleSubmit } = useForm();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
      navigate(from, { replace: true });
    } catch (err) {}
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {}
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input {...registerField('email')} type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input {...registerField('password')} type="password" placeholder="Password" className="input input-bordered w-full" required />
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <div className="divider">OR</div>
        <button onClick={handleGoogle} className="btn btn-outline w-full">Login with Google</button>
        <div className="text-center mt-3">
          <Link to="/register" className="text-sm">New here? Register</Link>
        </div>
      </div>
    </div>
  );
}
