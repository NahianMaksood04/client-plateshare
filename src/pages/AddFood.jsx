import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function AddFood() {
const { user } = useAuth();
const api = useAxios();
const navigate = useNavigate();
const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

const uploadImg = async (file) => {
const key = import.meta.env.VITE_IMGBB_KEY;
const form = new FormData();
form.append('image', file);
const res = await fetch(https://api.imgbb.com/1/upload?key=${key}, { method: 'POST', body: form });
const data = await res.json();
if (!data?.success) throw new Error('Image upload failed');
return data.data.url;
};

const onSubmit = async (data) => {
try {
const imageUrl = await uploadImg(data.image[0]);
const payload = {
name: data.name,
image: imageUrl,
quantity: Number(data.quantity),
pickupLocation: data.pickupLocation,
expireDate: data.expireDate,
notes: data.notes
};
await api.post('/api/foods', payload);
toast.success('Food added successfully');
reset();
navigate('/manage-foods');
} catch (err) {
toast.error(err.response?.data?.message || err.message || 'Failed to add food');
}
};

return (
<section className="container mx-auto px-4 py-10">
<h1 className="font-display text-3xl font-extrabold mb-6">Add Food</h1>
<form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
<div className="space-y-3">
<div>
<label className="label">Food Name</label>
<input className="input input-bordered w-full" {...register('name', { required: true })} />
{errors.name && <p className="text-error text-sm mt-1">Name is required</p>}
</div>
<div>
<label className="label">Food Image</label>
<input type="file" accept="image/*" className="file-input file-input-bordered w-full" {...register('image', { required: true })} />
{errors.image && <p className="text-error text-sm mt-1">Image is required</p>}
</div>
<div>
<label className="label">Food Quantity (Serves)</label>
<input type="number" min="1" className="input input-bordered w-full" {...register('quantity', { required: true, min: 1 })} />
{errors.quantity && <p className="text-error text-sm mt-1">Quantity must be at least 1</p>}
</div>
</div>
<div className="space-y-3">
<div>
<label className="label">Pickup Location</label>
<input className="input input-bordered w-full" {...register('pickupLocation', { required: true })} />
{errors.pickupLocation && <p className="text-error text-sm mt-1">Location is required</p>}
</div>
<div>
<label className="label">Expire Date</label>
<input type="date" className="input input-bordered w-full" {...register('expireDate', { required: true })} />
{errors.expireDate && <p className="text-error text-sm mt-1">Expire date is required</p>}
</div>
<div>
<label className="label">Additional Notes</label>
<textarea className="textarea textarea-bordered w-full" rows={3} {...register('notes')} />
</div>
<div className="pt-1">
<button disabled={isSubmitting} className="btn btn-primary">
{isSubmitting ? 'Adding...' : 'Add Food'}
</button>
</div>
</div>
</form>
</section>
);
}