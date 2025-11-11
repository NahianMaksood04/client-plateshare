import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthProvider';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
const { login, loginWithGoogle } = useAuth();
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
const navigate = useNavigate();
const location = useLocation();
const from = location.state?.from || '/';

const onSubmit = async (data) => {
try {
await login(data.email, data.password);
navigate(from, { replace: true });
} catch (err) {
toast.error(err.message || 'Failed to login');
}
};

const google = async () => {
try {
await loginWithGoogle();
navigate(from, { replace: true });
} catch (err) {
toast.error(err.message || 'Failed to login with Google');
}
};

return (
<section className="container mx-auto px-4 py-10 max-w-md">
<h1 className="font-display text-3xl font-extrabold mb-6">Login</h1>
<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
<div>
<label className="label">Email</label>
<input className="input input-bordered w-full" {...register('email', { required: true })} />
{errors.email && <p className="text-error text-sm mt-1">Email is required</p>}
</div>
<div>
<label className="label">Password</label>
<input type="password" className="input input-bordered w-full" {...register('password', { required: true })} />
{errors.password && <p className="text-error text-sm mt-1">Password is required</p>}
</div>
<button disabled={isSubmitting} className="btn btn-primary w-full">{isSubmitting ? 'Logging in...' : 'Login'}</button>
</form>
<button onClick={google} className="btn btn-outline w-full mt-3">Login with Google</button>
<p className="mt-3 text-sm">
New to PlateShare? <Link to="/register" className="link link-primary">Create an account</Link>
</p>
</section>
);
}