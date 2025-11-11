import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Loader from '../components/Loader';
import FoodCard from '../components/FoodCard';

export default function AvailableFoods() {
const api = useAxios();
const { data, isLoading } = useQuery({
queryKey: ['foods', 'Available'],
queryFn: async () => (await api.get('/api/foods', { params: { status: 'Available', sort: '-createdAt' } })).data
});

if (isLoading) return <Loader />;

return (
<section className="container mx-auto px-4 py-10">
<h1 className="font-display text-3xl font-extrabold mb-6">Available Foods</h1>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{data?.items?.map((food) => <FoodCard key={food._id} food={food} />)}
</div>
</section>
);
}