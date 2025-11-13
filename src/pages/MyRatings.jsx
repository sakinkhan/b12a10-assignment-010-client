import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import StarRating from "./PropertyDetails/StarRating";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyReviews = async () => {
      try {
        const res = await fetch(
          `b12a10-homenest-api-server.vercel.app/allReviews?email=${user.email}`
        );
        const data = await res.json();
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMyReviews(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyReviews();
  }, [user?.email]);

  return (
    <div className="mx-auto py-10 px-5 md:px-20 min-h-screen bg-linear-to-bl from-green-100 via-green-50 to-green-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-700 text-base-content dark:text-gray-200 transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold text-[#108251] dark:text-green-400 mb-6 font-primary">
        My Ratings ({myReviews.length})
      </h1>

      {myReviews.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 font-secondary">
          You haven't submitted any ratings or reviews yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myReviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              {/* Property Thumbnail */}
              {review.propertyImage && (
                <img
                  src={review.propertyImage}
                  alt={review.propertyName}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}

              {/* Property Name */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 font-primary">
                {review.propertyName}
              </h3>
              {/* Review Date */}
              <p className="text-gray-700 dark:text-gray-300 text-sm font-medium italic font-secondary mb-1">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Reviewed on:
                </span>{" "}
                {new Date(review.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {/* Star Rating */}
              <StarRating value={review.rating} readOnly size={20} />

              {/* Review Text */}
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 font-secondary line-clamp-4">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRatings;
