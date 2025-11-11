import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from 'react-hot-toast';

const MySwal = withReactContent(Swal);

export default function ManageFoods() {
  const api = useAxios();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['my-foods'],
    queryFn: async () => (await api.get('/api/foods/mine')).data
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => (await api.delete(`/api/foods/${id}`)).data, // ✅ backticks
    onSuccess: () => {
      toast.success('Food deleted');
      qc.invalidateQueries({ queryKey: ['my-foods'] });
    }
  });

  const confirmDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Delete this food?',
      text: "This can't be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      confirmButtonText: 'Delete'
    });
    if (result.isConfirmed) deleteMutation.mutate(id);
  };

  if (isLoading) return <Loader />;

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold mb-6">Manage My Foods</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Quantity</th>
              <th>Pickup</th>
              <th>Expires</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((f) => (
              <tr key={f._id}>
                <td className="flex items-center gap-3">
                  <img src={f.image} className="w-12 h-12 rounded object-cover" />
                  <span className="font-medium">{f.name}</span>
                </td>
                <td>Serves {f.quantity}</td>
                <td>{f.pickupLocation}</td>
                <td>{new Date(f.expireDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${f.food_status === 'Available' ? 'badge-success' : 'badge-neutral'}`}>
                    {f.food_status}
                  </span>
                </td>
                <td className="text-right">
                  <Link to={`/update-food/${f._id}`} className="btn btn-sm btn-outline mr-2">Update</Link>
                  <button onClick={() => confirmDelete(f._id)} className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-neutral/70">
                  You have not added any foods yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
