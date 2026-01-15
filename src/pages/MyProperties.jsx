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
          `https://b12a10-homenest-api-server.vercel.app/properties?userEmail=${user.email}`
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
      const res = await fetch(
        `https://b12a10-homenest-api-server.vercel.app/properties/${id}`,
        {
          method: "DELETE",
        }
      );
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
      const res = await fetch(
        `https://b12a10-homenest-api-server.vercel.app/properties/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataWithoutId),
        }
      );

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

  // Truncate description to 120 characters
  const truncateDescription = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="min-h-screen text-base-content dark:text-gray-200 transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold text-[#108251] dark:text-green-400 mb-6 font-primary">
        My Properties ({properties.length})
      </h1>

      {properties.length === 0 ? (
        <p className="text-left text-gray-500 dark:text-gray-400 font-secondary">
          You haven't added any properties yet.
        </p>
      ) : (
        <div className="space-y-6">
          {properties.map((property) => {
            const shortDescription = truncateDescription(property.description, 120);
            const isTruncated = property.description && property.description.length > 120;

            return (
              <div
                key={property._id}
                className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                {/* Outer Grid for Responsiveness - Landscape Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                  {/* 1. Image Section */}
                  <figure className="relative w-full h-56 sm:h-64 md:h-full overflow-hidden lg:col-span-1 p-2">
                    <img
                      src={property.propertyImage}
                      alt={property.propertyName}
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <div
                      className={`badge absolute top-4 right-4 text-white text-xs font-bold p-2 border-0 rounded-full ${
                        property.tag === "For Sale" ? "bg-[#108251]" : "bg-info"
                      }`}
                    >
                      {property.tag}
                    </div>
                  </figure>

                  {/* 2. Details Section */}
                  <div className="p-6 flex flex-col justify-between lg:col-span-2">
                    <div>
                      <h2 className="text-2xl font-primary font-bold">
                        {property.propertyName}
                      </h2>
                      <div className="flex items-center text-sm text-base-content/70 mb-2 pt-2 font-secondary">
                        <IoLocationSharp className="mt-1 mr-1 text-gray-400" />
                        {property.location}
                      </div>

                      {/* Description with inline "Read More" */}
                      {property.description && (
                        <p className="text-sm text-base-content/80 mb-3 font-secondary">
                          {isTruncated ? (
                            <>
                              {shortDescription}
                              <Link
                                to={`/propertyDetails/${property._id}`}
                                className="text-[#108251] hover:underline font-semibold"
                              >
                                Read More
                              </Link>
                            </>
                          ) : (
                            property.description
                          )}
                        </p>
                      )}

                      {/* Posted Date */}
                      <p className="text-sm text-base-content/80 mb-5 flex items-start font-secondary">
                        <span className="font-semibold mr-1">Posted Date:</span>{" "}
                        {new Date(property.postedDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="mb-4 btn w-fit btn-outline btn-success rounded-full h-7 hover:text-black cursor-default text-sm font-secondary">
                        {property.category}
                      </p>
                      {/* Property Specs */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium font-secondary">
                        <div className="flex items-center">
                          <FaBed className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                          {property.beds} Beds
                        </div>
                        <div className="flex items-center">
                          <FaBath className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                          {property.baths} Baths
                        </div>
                        <div className="flex items-center">
                          <BiArea className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                          {property.area} m²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Pricing & Action Buttons Section */}
                  <div className="p-6 md:col-span-2 lg:col-span-1 lg:p-8 flex flex-col justify-between items-center lg:items-end border-t md:border-t-0 lg:border-l border-base-200 bg-base-200">
                    <div className="mb-6 text-2xl lg:text-3xl font-extrabold text-[#108251] dark:text-success font-secondary text-center w-full">
                      {property.tag === "For Sale"
                        ? `$${property.price.toLocaleString()}`
                        : `$${property.price} / Week`}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Link
                        to={`/propertyDetails/${property._id}`}
                        className="btn btn-success w-full rounded-full hover:text-white hover:bg-[#108251] font-primary"
                      >
                        See Details
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setIsModalOpen(true);
                        }}
                        className="btn btn-info w-full rounded-full hover:text-white hover:bg-blue-500 border-0 font-primary"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="btn btn-error w-full rounded-full hover:text-white hover:bg-red-500 border-0 font-primary"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
