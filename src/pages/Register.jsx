import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { validatePassword } from '../utils/validators';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register: registerField, handleSubmit } = useForm();
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const passErrors = validatePassword(data.password);
    if (passErrors.length) return alert(passErrors.join(' '));
    try {
      await register({ name: data.name, email: data.email, password: data.password, photoURL: data.photoURL });
      navigate('/');
    } catch (err) {
      // handled in hook
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create an account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input {...registerField('name')} placeholder="Full name" className="input input-bordered w-full" required />
          <input {...registerField('email')} type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input {...registerField('photoURL')} placeholder="Photo URL (optional)" className="input input-bordered w-full" />
          <input {...registerField('password')} type="password" placeholder="Password" className="input input-bordered w-full" required />
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login" className="text-sm">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
