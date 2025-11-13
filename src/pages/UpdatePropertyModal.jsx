import React, { useEffect, useState } from "react";

const UpdatePropertyModal = ({ isOpen, onClose, propertyData, onUpdate }) => {
  const [formData, setFormData] = useState({ ...propertyData });

  
  useEffect(() => {
    setFormData({ ...propertyData });
  }, [propertyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare update object for MongoDB
    const { _id, ...updateFields } = formData;

    const sanitizedUpdate = {
      ...updateFields,
      price: Number(updateFields.price),
      beds: Number(updateFields.beds),
      baths: Number(updateFields.baths),
      area: Number(updateFields.area),
    };

    onUpdate({ _id, ...sanitizedUpdate });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-3xl">
        <h3 className="text-3xl text-left font-bold mb-4 font-primary text-[#108251]">
          Update Property
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Property Name and Price */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="label font-semibold font-primary mb-1">
                Property Name
              </label>
              <input
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                className="input input-bordered w-full font-secondary rounded-full"
                required
              />
            </div>
            <div>
              <label className="label font-semibold font-primary mb-1">
                Price $
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full font-secondary rounded-full"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="label font-semibold font-primary mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full font-secondary rounded-full"
              required
            />
          </div>

          {/* Beds, Baths, Area */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="label font-semibold font-primary mb-1">
                Beds
              </label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className="input input-bordered w-full font-secondary rounded-full"
                required
              />
            </div>
            <div>
              <label className="label font-semibold font-primary mb-1">
                Baths
              </label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                className="input input-bordered w-full font-secondary rounded-full"
                required
              />
            </div>
            <div>
              <label className="label font-semibold font-primary mb-1">
                Area (m²)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="input input-bordered w-full font-secondary rounded-full"
                required
              />
            </div>
          </div>

          {/* Category and Tag */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="label font-semibold font-primary mb-1">
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
            <div>
              <label className="label font-semibold font-primary mb-1">
                Tag
              </label>
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
          </div>

          {/* Image */}
          <div>
            <label className="label font-semibold font-primary mb-1">
              Image Link
            </label>
            <input
              type="text"
              name="propertyImage"
              value={formData.propertyImage}
              onChange={handleChange}
              className="input input-bordered w-full font-secondary rounded-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold font-primary mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full font-secondary rounded-2xl"
              required
            />
          </div>

          {/* Actions */}
          <div className="modal-action justify-between">
            <button
              type="submit"
              className="btn btn-info hover:bg-blue-500 text-white rounded-full"
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-outline rounded-full"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyModal;
