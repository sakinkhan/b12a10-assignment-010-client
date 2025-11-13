import React, { useState, useContext, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import StarRating from "./StarRating";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const RatingsReview = ({ propertyData }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewsList, setReviewsList] = useState([]);

  // ✅ Fetch all reviews for this property on mount
  useEffect(() => {
    if (!propertyData?._id) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/allReviews?propertyId=${propertyData._id}`
        );
        const data = await res.json();
        setReviewsList(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [propertyData?._id]);

  // ✅ Submit handler (same as before)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      Swal.fire({
        title: "Rating Required",
        text: "Please select a star rating before submitting.",
        icon: "warning",
        confirmButtonColor: "#108251",
      });
      return;
    }

    if (!review.trim()) {
      Swal.fire({
        title: "Review Required",
        text: "Please write a short review before submitting.",
        icon: "warning",
        confirmButtonColor: "#108251",
      });
      return;
    }

    const newReview = {
      name: user?.displayName || "Anonymous User",
      email: user?.email || "unknown",
      rating,
      review,
      propertyId: propertyData._id,
      propertyName: propertyData.propertyName,
      propertyImage: propertyData.propertyImage,
    };

    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      const data = await res.json();

      if (data.insertedId) {
        setReviewsList((prev) => [
          ...prev,
          { ...newReview, _id: data.insertedId, createdAt: new Date() },
        ]);
        setRating(0);
        setReview("");

        Swal.fire({
          title: "Review Submitted!",
          text: "Your review has been successfully added.",
          icon: "success",
          confirmButtonText: "Okay",
          customClass: {
            confirmButton:
              "btn btn-success bg-[#108251] hover:bg-success text-white font-semibold rounded-full px-6 py-2 font-primary mb-2",
          },
          buttonsStyling: false,
        });
      }
    } catch (err) {
      console.error("Error saving review:", err);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 mt-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-primary">
        Ratings & Reviews
      </h2>

      {/* Review Form */}
      <form onSubmit={handleReviewSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200 font-primary">
              Your Rating:
            </span>
            <StarRating value={rating} onChange={setRating} size={28} />
          </div>

          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a short review..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#108251] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-seconary"
          />

          <button
            type="submit"
            className="btn bg-[#108251] hover:bg-success dark:bg-green-600 dark:hover:bg-green-500 text-white hover:text-black font-semibold px-5 py-2 rounded-full text-sm transition-all duration-200 font-primary"
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
              key={item._id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex gap-4 bg-white dark:bg-gray-900"
            >
              {/* Reviewer Avatar */}
              {item.email === user?.email && user?.photoURL ? (
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
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-primary">
                  Reviewed on:{" "}
                  {new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
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
