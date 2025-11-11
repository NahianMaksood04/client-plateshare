import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "../hooks/useAxios";

const RequestModal = ({ foodId, isOpen, onClose, onSuccess }) => {
const { register, handleSubmit, reset } = useForm();

const onSubmit = async (data) => {
try {
await axios.post("/api/requests", { ...data, foodId });
toast.success("Request sent!");
reset();
onSuccess?.();
onClose();
} catch (err) {
toast.error(err?.response?.data?.message || "Failed to send request");
}
};

if (!isOpen) return null;

return (
<dialog className="modal modal-open">
<div className="modal-box bg-base-200">
<h3 className="font-bold text-lg mb-4">Request this Food</h3>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
<div className="form-control">
<label className="label">Pickup Location</label>
<input className="input input-bordered" placeholder="Your location"
{...register("location", { required: true })}/>
</div>
<div className="form-control">
<label className="label">Why do you need this food?</label>
<textarea className="textarea textarea-bordered" rows="3"
placeholder="Tell the donor why you need it"
{...register("reason", { required: true })}></textarea>
</div>
<div className="form-control">
<label className="label">Contact Number</label>
<input className="input input-bordered" placeholder="+1 234 567 890"
{...register("contactNo", { required: true })}/>
</div>
<div className="modal-action">
<button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
<button type="submit" className="btn btn-primary">Submit Request</button>
</div>
</form>
</div>
<form method="dialog" className="modal-backdrop">
<button onClick={onClose}>close</button>
</form>
</dialog>
);
};

export default RequestModal;