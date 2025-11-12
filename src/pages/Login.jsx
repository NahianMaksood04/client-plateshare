import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AuthIllustration = () => (
    <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-secondary/10 p-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="font-heading text-4xl font-bold text-neutral mb-4">Welcome Back!</h2>
            <p className="text-neutral/70 max-w-sm mx-auto">
                Your contributions help build a stronger community. Let's continue the mission to reduce food waste together.
            </p>
        </motion.div>
    </div>
);

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleSignIn, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(() => {
                toast.success('Login successful!');
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                toast.success('Login successful!');
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="flex w-full max-w-4xl min-h-[600px] rounded-2xl shadow-2xl overflow-hidden bg-base-200"
            >
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold font-heading mb-2">Login to Your Account</h1>
                    <p className="text-neutral/60 mb-8">Let's get you signed in.</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Email Address</span></label>
                            <input type="email" {...register("email", { required: true })} placeholder="you@example.com" className="input-custom" />
                            {errors.email && <span className="text-error text-sm mt-1">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Password</span></label>
                            <input type="password" {...register("password", { required: true })} placeholder="••••••••" className="input-custom" />
                            {errors.password && <span className="text-error text-sm mt-1">This field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary rounded-full text-white text-lg h-14">Login</button>
                        </div>
                    </form>

                    <div className="divider my-6">OR</div>

                    <button onClick={handleGoogleSignIn} className="btn btn-outline rounded-full text-lg h-14 w-full border-neutral/30">
                        <FaGoogle className="mr-2" /> Continue with Google
                    </button>

                    <p className="mt-8 text-center">
                        New to PlateShare? <Link to="/register" className="link link-primary font-semibold">Create an account</Link>
                    </p>
                </div>
                <AuthIllustration />
            </motion.div>
        </div>
    );
};

export default Login;
