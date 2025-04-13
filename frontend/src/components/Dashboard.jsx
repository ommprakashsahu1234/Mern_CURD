import React, { useState, useEffect } from "react";

function Dashboard() {
  const [name, setName] = useState("");
  const [mobno, setMobno] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [warn, setWarn] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWarn("Unauthorized: No token found.");
      return;
    }

    fetch("http://localhost:5000/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or server error");
        }
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setUsername(data.username);
        setMobno(data.mobno);
        
      })
      .catch((err) => {
        setWarn("Failed to load data: " + err.message);
      });
  }, []);

  if (warn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Warning</h2>
          <p className="text-center text-red-500">{warn}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Home</h2>
        <p className="text-center text-white">Name : {name}</p>
        <p className="text-center text-white">Email : {email}</p>
        <p className="text-center text-white">Username : {username}</p>
        <p className="text-center text-white">Mobile No : {mobno}</p>
      </div>
    </div>
  );
}

export default Dashboard;
