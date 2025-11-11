import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useForm } from 'react-hook-form';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function UpdateFood() {
  const { id } = useParams();
  const api = useAxios();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['food', id],
    queryFn: async () => (await api.get(`/api/foods/${id}`)).data
  });

  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: async (payload) => (await api.patch(`/api/foods/${id}`, payload)).data,
    onSuccess: () => {
      toast.success('Food updated');
      qc.invalidateQueries({ queryKey: ['food', id] });
      qc.invalidateQueries({ queryKey: ['my-foods'] });
      navigate('/manage-foods');
    }
  });

  const onSubmit = (dataForm) => {
    const payload = {
      name: dataForm.name,
      quantity: Number(dataForm.quantity),
      pickupLocation: dataForm.pickupLocation,
      expireDate: dataForm.expireDate,
      notes: dataForm.notes
    };
    mutation.mutate(payload);
  };

  if (isLoading) return <Loader />;

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold mb-6">Update Food</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className="label">Food Name</label>
            <input className="input input-bordered w-full" defaultValue={data?.name} {...register('name')} />
          </div>
          <div>
            <label className="label">Food Quantity (Serves)</label>
            <input type="number" min="1" className="input input-bordered w-full" defaultValue={data?.quantity} {...register('quantity')} />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="label">Pickup Location</label>
            <input className="input input-bordered w-full" defaultValue={data?.pickupLocation} {...register('pickupLocation')} />
          </div>
          <div>
            <label className="label">Expire Date</label>
            <input type="date" className="input input-bordered w-full" defaultValue={data?.expireDate?.slice(0,10)} {...register('expireDate')} />
          </div>
          <div>
            <label className="label">Additional Notes</label>
            <textarea className="textarea textarea-bordered w-full" rows={3} defaultValue={data?.notes} {...register('notes')} />
          </div>
          <div className="pt-1">
            <button disabled={mutation.isLoading} className="btn btn-primary">
              {mutation.isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
