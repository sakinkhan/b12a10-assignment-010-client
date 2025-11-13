import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import UpdatePropertyModal from "./UpdatePropertyModal";
import Loading from "../components/Loading";
import { Link } from "react-router";
import { IoLocationSharp } from "react-icons/io5";
import { FaBath, FaBed } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/properties?userEmail=${user.email}`
        );
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        Swal.fire("Error", "Failed to load your properties.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user?.email]);

  // Delete a property with confirmation
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      customClass: {
        confirmButton:
          "btn btn-error hover:bg-red-600 hover:text-white font-semibold rounded-full px-6 py-2 mr-4 font-primary mb-2",
        cancelButton:
          "btn bg-gray-300 hover:bg-gray-400 text-gray-900 hover:text-white font-semibold rounded-full px-6 py-2 font-primary mb-2 border-0",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/properties/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your property has been deleted.",
          icon: "success",
          customClass: {
            confirmButton:
              "btn btn-success bg-[#108251] hover:bg-success text-white font-semibold rounded-full px-6 py-2 font-primary mb-2",
          },
          buttonsStyling: false,
        });
        setProperties((prev) => prev.filter((prop) => prop._id !== id));
      } else {
        Swal.fire("Failed", "Could not delete property.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong while deleting.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Update a property
  const handleUpdate = async (updatedProperty) => {
    setIsUpdating(true);
    try {
      const { _id, ...dataWithoutId } = updatedProperty; // remove _id
      const res = await fetch(`http://localhost:3000/properties/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithoutId),
      });

      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Property Updated!",
          text: "Your property has been successfully updated.",
          icon: "success",
          customClass: {
            confirmButton:
              "btn btn-success bg-[#108251] hover:bg-success text-white font-semibold rounded-full px-6 py-2 font-primary mb-2",
          },
          buttonsStyling: false,
        });
        setProperties((prev) =>
          prev.map((prop) => (prop._id === _id ? updatedProperty : prop))
        );
        setIsModalOpen(false);
      } else {
        Swal.fire("No Changes", "No updates were made.", "info");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      Swal.fire("Error", "Failed to update property.", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-linear-to-bl from-green-100 via-green-50 to-green-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-700 text-base-content dark:text-gray-200 transition-colors duration-300 ">
      <h1 className="text-3xl md:text-4xl font-bold text-[#108251] dark:text-green-400 mb-6  font-primary">
        My Properties ({properties.length})
      </h1>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 font-secondary">
          You haven't added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-xl p-5 hover:shadow-lg transition duration-300 relative flex flex-col justify-between hover:scale-105"
            >
              <figure className="relative w-full h-56 sm:h-64 md:h-full overflow-hidden lg:col-span-1">
                <img
                  src={property.propertyImage}
                  alt={property.propertyName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div
                  className={`badge absolute top-4 right-4 text-white text-xs font-bold p-2 border-0 rounded-full ${
                    property.tag === "For Sale" ? "bg-[#108251]" : "bg-info"
                  }`}
                >
                  {property.tag}
                </div>
              </figure>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-[#108251] dark:text-green-400  font-primary">
                    {property.propertyName}
                  </h2>
                  <p className="badge bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full">
                    {property.category}
                  </p>
                </div>
                {/* Location */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 font-secondary flex items-center">
                  <IoLocationSharp className="text-gray-600 dark:text-gray-300 mr-1" />
                  {property.location}
                </p>
                {/* PostedBy Date */}
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1 font-secondary">
                  <span className="font-primary font-semibold">Posted on:</span>{" "}
                  {new Date(property.postedDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-secondary flex items-center gap-5">
                  <div className="flex items-center">
                    <FaBed className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                    {property.beds} Beds
                  </div>
                  <p>|</p>
                  <div className="flex items-center">
                    <FaBath className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                    {property.baths} Baths
                  </div>
                  <p>|</p>
                  <div className="flex items-center">
                    <BiArea className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                    {property.area} m²
                  </div>
                </div>

                <p className="text-[#108251] dark:text-success font-semibold mb-2 font-secondary mt-3">
                  {property.tag === "For Sale"
                    ? `$${property.price.toLocaleString()}`
                    : `$${property.price}/Week`}
                </p>
              </div>
              {/* Buttons */}
              <div className="flex flex-col flex-wrap md:flex-row gap-2 justify-center items-center bg-base-300 py-5 px-20 md:px-5 lg:px-2 rounded-2xl font-primary">
                <Link
                  to={`/propertyDetails/${property._id}`}
                  className="btn btn-success btn-sm rounded-full hover:text-white hover:bg-[#108251] font-primary w-full md:w-22"
                >
                  See Details
                </Link>
                <button
                  onClick={() => {
                    setSelectedProperty(property);
                    setIsModalOpen(true);
                  }}
                  className="btn btn-info btn-sm rounded-full hover:text-white hover:bg-blue-500 border-0 w-full md:w-22"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-error btn-sm hover:text-white hover:bg-red-500 border-0 rounded-full w-full md:w-22"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      <UpdatePropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyData={selectedProperty}
        onUpdate={handleUpdate}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default MyProperties;
