import React, { useState, useEffect } from 'react';

function Update() {
  const [email, setEmail] = useState('');
  const [mobno, setMobno] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUnauthorized(true);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setUnauthorized(true);
      return;
    }

    const body = {};
    if (email.trim()) body.email = email;
    if (mobno.trim()) body.mobno = mobno;
    if (password.trim()) body.password = password;

    if (Object.keys(body).length === 0) {
      setMessage("❌ Please fill at least one field to update.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update');
      }

      setMessage('✅ Update successful!');
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Unauthorized Access</h2>
          <p className="text-white">Please login to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Update Details</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-white mb-2">New Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              placeholder="Enter new email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">New Mobile Number</label>
            <input
              type="text"
              value={mobno}
              onChange={(e) => setMobno(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              placeholder="Enter new mobile number"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Update
          </button>
        </form>
        {message && <p className="text-center mt-4 text-yellow-400">{message}</p>}
      </div>
    </div>
  );
}

export default Update;
