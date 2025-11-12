import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded shadow max-w-md">
        <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} className="w-24 h-24 rounded-full" />
        <h2 className="text-xl font-semibold mt-3">{user.displayName}</h2>
        <div className="text-sm text-muted mt-1">{user.email}</div>
      </div>
    </div>
  );
}
