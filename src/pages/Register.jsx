import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AuthIllustration = () => (
    <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-primary/10 p-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="font-heading text-4xl font-bold text-neutral mb-4">Join the Community</h2>
            <p className="text-neutral/70 max-w-sm mx-auto">
                Create an account to start sharing food, reducing waste, and making a real difference in your neighborhood.
            </p>
        </motion.div>
    </div>
);

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn, setLoading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        toast.success('Registration successful!');
                        navigate('/');
                    })
                    .catch(err => {
                        toast.error(err.message);
                        setLoading(false);
                    });
            })
            .catch(err => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                toast.success('Registration successful!');
                navigate('/');
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
                    <h1 className="text-3xl font-bold font-heading mb-2">Create Your Account</h1>
                    <p className="text-neutral/60 mb-8">It's free and only takes a minute.</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Full Name</span></label>
                            <input type="text" {...register("name", { required: true })} placeholder="Your Name" className="input-custom" />
                            {errors.name && <span className="text-error text-sm mt-1">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Email Address</span></label>
                            <input type="email" {...register("email", { required: true })} placeholder="you@example.com" className="input-custom" />
                            {errors.email && <span className="text-error text-sm mt-1">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Photo URL</span></label>
                            <input type="url" {...register("photoURL", { required: true })} placeholder="http://example.com/photo.jpg" className="input-custom" />
                            {errors.photoURL && <span className="text-error text-sm mt-1">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Password</span></label>
                            <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" }, pattern: { value: /(?=.*[A-Z])(?=.*[a-z])/, message: "Password must have one uppercase and one lowercase letter" } })} placeholder="••••••••" className="input-custom" />
                            {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary rounded-full text-white text-lg h-14">Create Account</button>
                        </div>
                    </form>

                    <div className="divider my-6">OR</div>

                    <button onClick={handleGoogleSignIn} className="btn btn-outline rounded-full text-lg h-14 w-full border-neutral/30">
                        <FaGoogle className="mr-2" /> Continue with Google
                    </button>

                    <p className="mt-8 text-center">
                        Already have an account? <Link to="/login" className="link link-primary font-semibold">Login here</Link>
                    </p>
                </div>
                <AuthIllustration />
            </motion.div>
        </div>
    );
};

export default Register;
