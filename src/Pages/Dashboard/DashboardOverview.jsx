import React, { use,, useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const DashboardOverview = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myPosts, setMyPosts] = useState([]);
  const [myInterests, setMyInterests] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const postsRes = await fetch(`https://krishi-farm-a10-server.vercel.app/myCrops?email=${user.email}`);
        const postsData = await postsRes.json();
        setMyPosts(postsData);

        const interestsRes = await fetch(`https://krishi-farm-a10-server.vercel.app/myInterests?email=${user.email}`);
        const interestsData = await interestsRes.json();
        setMyInterests(interestsData);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <Loading />;

  // Prepare chart data
  const cropTypeData = myPosts.reduce((acc, crop) => {
    const existing = acc.find((c) => c.type === crop.type);
    if (existing) existing.quantity += crop.quantity;
    else acc.push({ type: crop.type, quantity: crop.quantity });
    return acc;
  }, []);

  const interestsStatusData = ["pending", "accepted", "rejected"].map((status) => ({
    name: status,
    value: myInterests.filter((i) => i.status === status).length
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Posts</h3>
          <p className="text-2xl font-bold">{myPosts.length}</p>
        </div>
        <div className="bg-secondary text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Interests</h3>
          <p className="text-2xl font-bold">{myInterests.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Pending Interests</h3>
          <p className="text-2xl font-bold">{myInterests.filter(i => i.status === "pending").length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart for Crop Types */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Crop Quantity by Type</h3>
          <BarChart width={400} height={300} data={cropTypeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Pie Chart for Interests Status */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Interests Status</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={interestsStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {interestsStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* My Posts Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-2">My Posts</h3>
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Crop Name</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Price</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map((post) => (
              <tr key={post._id}>
                <td className="border px-2 py-1">{post.name}</td>
                <td className="border px-2 py-1">{post.type}</td>
                <td className="border px-2 py-1">{post.quantity}</td>
                <td className="border px-2 py-1">{post.pricePerUnit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOverview;
