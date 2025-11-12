import React from 'react';
import { useForm } from 'react-hook-form';

export default function RequestModal({ isOpen, onClose, onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-3">Request Food</h3>
        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div>
            <label className="text-sm">Pickup Location</label>
            <input {...register('location')} required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="text-sm">Why do you need this?</label>
            <textarea {...register('reason')} required className="textarea textarea-bordered w-full" />
          </div>
          <div>
            <label className="text-sm">Contact No.</label>
            <input {...register('contact_no')} required className="input input-bordered w-full" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
