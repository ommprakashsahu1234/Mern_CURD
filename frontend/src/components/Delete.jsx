import React from 'react';
import { useNavigate } from 'react-router-dom';

function Delete() {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Unauthorized access");
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/delete-account', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete account');
      }

      localStorage.removeItem('token');
      alert("✅ Account deleted successfully.");
      navigate('/');
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Delete Account</h2>
        <p className="text-white mb-6">Are you sure you want to permanently delete your account?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
          >
            Yes, Delete
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
