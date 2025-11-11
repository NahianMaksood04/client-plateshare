import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
const { register: registerUser } = useAuth();
const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
const navigate = useNavigate();

const onSubmit = async (data) => {
try {
await registerUser(data.name, data.email, data.photoURL, data.password);
navigate('/');
} catch (err) {
toast.error(err.message || 'Registration failed');
}
};

return (
<section className="container mx-auto px-4 py-10 max-w-md">
<h1 className="font-display text-3xl font-extrabold mb-6">Create Account</h1>
<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
<div>
<label className="label">Name</label>
<input className="input input-bordered w-full" {...register('name', { required: true })} />
{errors.name && <p className="text-error text-sm mt-1">Name is required</p>}
</div>
<div>
<label className="label">Email</label>
<input className="input input-bordered w-full" {...register('email', { required: true })} />
{errors.email && <p className="text-error text-sm mt-1">Email is required</p>}
</div>
<div>
<label className="label">Photo URL</label>
<input className="input input-bordered w-full" {...register('photoURL', { required: true })} />
{errors.photoURL && <p className="text-error text-sm mt-1">Photo URL is required</p>}
</div>
<div>
<label className="label">Password</label>
<input
type="password"
className="input input-bordered w-full"
{...register('password', {
required: true,
minLength: 6,
validate: {
hasUpper: v => /[A-Z]/.test(v) || 'Must contain an uppercase letter',
hasLower: v => /[a-z]/.test(v) || 'Must contain a lowercase letter'
}
})}
/>
{errors.password && <p className="text-error text-sm mt-1">{errors.password.message || 'Password must be 6+ chars'}</p>}
</div>
<button disabled={isSubmitting} className="btn btn-primary w-full">{isSubmitting ? 'Creating...' : 'Register'}</button>
</form>
<p className="mt-3 text-sm">
Already have an account? <Link to="/login" className="link link-primary">Login</Link>
</p>
</section>
);
}