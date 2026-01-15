import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useLoaderData, useNavigate } from "react-router";
import PropertyDetailsCard from "./PropertyDetailsCard";
import RatingsReview from "./RatingsReview";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loadedProperty = useLoaderData();
  const [property, setProperty] = useState(loadedProperty);

  // UPDATE HANDLER
  const handleUpdate = async (updatedData) => {
    setLoading(true);
    try {
      const { _id, ...dataWithoutId } = updatedData;

      const res = await fetch(
        `https://b12a10-homenest-api-server.vercel.app/properties/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataWithoutId),
        }
      );

      const result = await res.json();

      if (result.modifiedCount > 0) {
        setProperty(updatedData);
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
      } else {
        Swal.fire({
          title: "No Changes",
          text: "No updates were made.",
          icon: "info",
          confirmButtonColor: "#108251",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  // DELETE HANDLER
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
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

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://b12a10-homenest-api-server.vercel.app/properties/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (result.deletedCount > 0) {
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
        setProperty(null);
        navigate(-1);
      } else {
        Swal.fire({
          title: "Failed",
          text: "Property could not be deleted. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!property) return null;

  return (
    <div className="bg-green-50 dark:bg-gray-900 py-10">
      <title>HomeNest - Property Details</title>

      {/* BACK BUTTON */}
      <div className="px-5 md:px-20">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-success rounded-full font-primary"
        >
          <IoMdArrowBack />
          Go Back
        </button>
      </div>

      <div className="px-5 md:px-20">
        {/* PROPERTY DETAILS */}
        <PropertyDetailsCard
          propertyData={property}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* RATINGS & REVIEW */}
        <RatingsReview propertyData={property} />
      </div>
    </div>
  );
};

export default PropertyDetails;
