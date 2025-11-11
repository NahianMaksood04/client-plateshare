import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const FoodCard = ({ food }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    _id,
    foodImage,
    foodName,
    donorName,
    donorPhoto,
    foodQuantity,
    pickupLocation,
    expireDate,
  } = food;

  const handleView = () => {
    if (!user)
      navigate("/login", { state: { from: `/food/${_id}` } }); // backticks
    else navigate(`/food/${_id}`); // backticks
  };

  return (
    <div className="card bg-base-200 hover:bg-base-300 client-smooth shadow-xl group">
      <figure className="overflow-hidden h-56">
        <img
          src={foodImage}
          alt={foodName}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-peach">{foodName}</h3>
        <div className="flex items-center gap-3">
          <img
            src={donorPhoto || "/src/assets/logo.svg"}
            className="w-8 h-8 rounded-full border border-base-300"
          />
          <span className="opacity-80">{donorName}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm opacity-80">
          <div>Serves: {foodQuantity}</div>
          <div>Pickup: {pickupLocation}</div>
          <div className="col-span-2">
            Expires: {new Date(expireDate).toLocaleDateString()}
          </div>
        </div>
        <div className="card-actions mt-2">
          <button onClick={handleView} className="btn btn-primary w-full">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
