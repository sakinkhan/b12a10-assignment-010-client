import React, { useState, use } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const AddProperties = () => {
  const { user } = use(AuthContext);

  const [formData, setFormData] = useState({
    propertyName: "",
    description: "",
    category: "",
    price: "",
    location: "",
    image: "",
    beds: "",
    baths: "",
    area: "",
    tag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    const newProperty = {
      ...formData,
      price: Number(formData.price),
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      area: Number(formData.area),
      propertyImage: formData.image,
      userEmail: user?.email || "unknown",
      userName: user?.displayName || "Anonymous",
      postedDate: new Date().toISOString(),
    };

    fetch("https://b12a10-homenest-api-server.vercel.app/properties", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Property Added!",
            text: "Your property has been successfully added to the listings.",
            icon: "success",
            customClass: {
              confirmButton:
                "btn btn-success bg-[#108251] hover:bg-success text-white font-semibold rounded-full px-6 py-2 font-primary mb-2",
            },
            buttonsStyling: false,
          });

          // Reset form
          setFormData({
            propertyName: "",
            description: "",
            category: "",
            price: "",
            location: "",
            image: "",
            beds: "",
            baths: "",
            area: "",
            tag: "",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to add property. Please try again later.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-10 bg-linear-to-br from-green-100 via-green-50 to-green-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-700 text-base-content dark:text-gray-200 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg p-8 transition-all duration-300">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#108251] dark:text-success font-primary">
          Add a New Property
        </h2>

        <form onSubmit={handleAddProperty} className="space-y-6">
          {/* Property Name */}
          <div>
            <label className="block font-semibold mb-2 font-primary">
              Property Name
            </label>
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              placeholder="Enter property name"
              className="rounded-full input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2 font-primary">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              className="rounded-2xl textarea textarea-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2 font-primary">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="rounded-full select select-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
              required
            >
              <option value="">Select Category</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Unit">Unit</option>
              <option value="Land">Land</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-2 font-primary">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="rounded-full input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
              required
            />
          </div>

          {/* Beds, Baths, Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-2 font-primary">
                Beds
              </label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                placeholder="e.g. 3"
                className="rounded-full input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 font-primary">
                Baths
              </label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                placeholder="e.g. 2"
                className="rounded-full input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 font-primary">
                Area (in Sqm)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. 120"
                className="rounded-full input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
                required
              />
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="block font-semibold mb-2 font-primary">Tag</label>
            <select
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="rounded-full select select-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
              required
            >
              <option value="">Select Tag</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-2 font-primary">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter full address"
              className="rounded-full input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
              required
            />
          </div>

          {/* Image Link */}
          <div>
            <label className="block font-semibold mb-2 font-primary">
              Image Link
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="rounded-full input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 font-secondary"
              required
            />
          </div>

          {/* User Info (Read Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2 font-primary">
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName || "Anonymous"}
                readOnly
                className="rounded-full input input-bordered w-full cursor-not-allowed bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-700 font-secondary"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 font-primary">
                User Email
              </label>
              <input
                type="email"
                value={user?.email || "unknown"}
                readOnly
                className="rounded-full input input-bordered w-full cursor-not-allowed bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-700 font-secondary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full mt-6 bg-success dark:bg-green-600 text-white font-semibold hover:bg-[#108251] font-primary rounded-full"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperties;
