import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

export default function MyRequests() {
const api = useAxios();

const { data, isLoading } = useQuery({
queryKey: ['my-requests'],
queryFn: async () => (await api.get('/api/requests/mine')).data
});

if (isLoading) return <Loader />;

return (
<section className="container mx-auto px-4 py-10">
<h1 className="font-display text-3xl font-extrabold mb-6">My Food Requests</h1>
<div className="overflow-x-auto">
<table className="table">
<thead>
<tr>
<th>Food</th>
<th>Pickup</th>
<th>Expires</th>
<th>Status</th>
<th className="text-right">Actions</th>
</tr>
</thead>
<tbody>
{data?.map((r) => (
<tr key={r._id}>
<td>
<div className="font-medium">{r.food?.name}</div>
<div className="text-xs text-neutral/60">Serves {r.food?.quantity}</div>
</td>
<td>{r.food?.pickupLocation}</td>
<td>{r.food?.expireDate ? new Date(r.food.expireDate).toLocaleDateString() : '-'}</td>
<td>
<span className={badge ${r.status === 'pending' ? 'badge-warning' : r.status === 'accepted' ? 'badge-success' : 'badge-neutral'}}>{r.status}</span>
</td>
<td className="text-right">
{r.food?._id && <Link className="btn btn-xs btn-outline" to={/food/${r.food._id}}>View</Link>}
</td>
</tr>
))}
{data?.length === 0 && (
<tr><td colSpan={5} className="text-center py-6 text-neutral/70">You haven’t requested any food yet.</td></tr>
)}
</tbody>
</table>
</div>
</section>
);
}