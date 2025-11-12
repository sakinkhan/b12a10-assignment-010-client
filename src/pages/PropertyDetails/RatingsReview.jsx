import React, { use, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import StarRating from "./StarRating";
import { AuthContext } from "../../provider/AuthProvider";

const RatingsReview = () => {
  const { user } = use(AuthContext);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewsList, setReviewsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.trim() || rating === 0) return;

    const newReview = {
      id: Date.now(),
      name: user?.displayName || "Anonymous User", // use user from AuthContext
      rating,
      review,
    };

    setReviewsList([newReview, ...reviewsList]);
    setRating(0);
    setReview("");
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 mt-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-primary">
        Ratings & Reviews
      </h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200 font-primary">
              Your Rating:
            </span>
            <StarRating value={rating} onChange={setRating} size={28} />
          </div>

          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a short review..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#108251] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />

          <button
            type="submit"
            className="btn bg-[#108251] hover:bg-success dark:bg-green-600 dark:hover:bg-green-500 text-white hover:text-black font-semibold px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 font-primary"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviewsList.length > 0 ? (
          reviewsList.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex gap-4 bg-white dark:bg-gray-900"
            >
              {/* Render user photo if available */}
              {item.name === user?.displayName && user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-4xl text-gray-400" />
              )}

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 font-primary">
                    {item.name}
                  </h3>
                  <StarRating value={item.rating} readOnly size={20} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 font-secondary">
                  {item.review}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 italic">
            No reviews yet. Be the first to share your thoughts.
          </p>
        )}
      </div>
    </div>
  );
};

export default RatingsReview;
