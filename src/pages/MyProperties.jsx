import React, { use, useEffect, useState } from "react";

import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import Loading from "../components/Loading";

const MyProperties = () => {
  const { user } = use(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties"); // Replace with your API endpoint
        const data = await res.json();
        // Filter by logged-in user email
        const userProperties = data.filter((p) => p.userEmail === user?.email);
        setProperties(userProperties);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchProperties();
  }, [user?.email]);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      // Call API to delete
      setProperties(properties.filter((p) => p._id !== id));
      // TODO: call DELETE API endpoint
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center font-primary">
        My Properties
      </h1>

      {properties.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-400 font-secondary text-center">
          You have not added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl"
            >
              {/* Property Image */}
              <img
                src={p.propertyImage}
                alt={p.propertyName}
                className="w-full h-56 object-cover"
              />

              {/* Property Details */}
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {p.propertyName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {p.category} • {p.location}
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-bold mt-1">
                    ${p.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Posted on {new Date(p.postedDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {/* update-property/${prop._id} */}
                  <Link
                    to={`/`}
                    className="flex-1 btn flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded font-semibold text-sm"
                  >
                    <FaEdit /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 btn flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-semibold text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                  {/* propertyDetails/${prop._id} */}
                  <Link
                    to={`/`}
                    className="flex-1 btn flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded font-semibold text-sm"
                  >
                    <FaEye /> View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
