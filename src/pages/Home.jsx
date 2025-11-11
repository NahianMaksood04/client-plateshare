import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";

export default function Home() {
  const api = useAxios();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => (await api.get("/api/foods/featured")).data,
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight">
              Share Surplus. Feed Community.
            </h1>
            <p className="mt-4 text-lg text-neutral/80">
              PlateShare connects neighbors to reduce food waste. Donate extra
              meals or find available food near you.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate("/foods")}
                className="btn btn-primary"
              >
                View All Foods
              </button>
              <Link to="/add-food" className="btn btn-secondary">
                Donate Food
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="absolute -top-10 right-10 w-64 h-64 bg-primary hero-blob rounded-full"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="absolute bottom-0 -left-10 w-72 h-72 bg-secondary hero-blob rounded-full"
          />
        </div>
      </section>

      {/* Featured Foods */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold">
            Featured Foods
          </h2>
          <Link
            to="/foods"
            className="btn btn-outline btn-primary btn-sm"
          >
            Show All
          </Link>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((f) => (
              <FoodCard key={f._id} food={f} />
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 border h-full">
            <div className="card-body">
              <h3 className="card-title">1. Post Food</h3>
              <p>
                List surplus food with quantity, pickup location, and expiry
                date. A few clicks is all it takes.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border h-full">
            <div className="card-body">
              <h3 className="card-title">2. Find Food</h3>
              <p>
                Browse available meals around you and view details to request
                what you need.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border h-full">
            <div className="card-body">
              <h3 className="card-title">3. Collect</h3>
              <p>
                Once accepted by the donator, pick up the food at the agreed
                location. Simple and safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold">
              Our Mission
            </h2>
            <p>
              We aim to reduce food waste and strengthen communities.
              PlateShare empowers neighbors to share, support, and care.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="stat bg-base-100 border rounded-box">
              <div className="stat-title">Meals Shared</div>
              <div className="stat-value text-primary">1.2K</div>
              <div className="stat-desc">and counting</div>
            </div>
            <div className="stat bg-base-100 border rounded-box">
              <div className="stat-title">Donators</div>
              <div className="stat-value text-secondary">420</div>
              <div className="stat-desc">active</div>
            </div>
            <div className="stat bg-base-100 border rounded-box">
              <div className="stat-title">Requests</div>
              <div className="stat-value text-accent">2.8K</div>
              <div className="stat-desc">processed</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
