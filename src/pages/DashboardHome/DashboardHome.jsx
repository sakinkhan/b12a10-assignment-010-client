import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading";
import { FaBed, FaBath, FaRulerCombined, FaTag } from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const API = "https://b12a10-homenest-api-server.vercel.app/properties";
const REVIEWS_API = "https://b12a10-homenest-api-server.vercel.app/allReviews";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const [userProperties, setUserProperties] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    let mounted = true;
    setLoading(true);

    Promise.all([
      fetch(`${API}?userEmail=${user.email}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      }),
      fetch(REVIEWS_API)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch reviews");
          return res.json();
        })
        .catch(() => []), // If reviews fail, continue with empty array
    ])
      .then(([propertiesData, reviewsData]) => {
        if (mounted) {
          setUserProperties(
            Array.isArray(propertiesData) ? propertiesData : []
          );
          setAllReviews(Array.isArray(reviewsData) ? reviewsData : []);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, [user?.email]);

  const stats = useMemo(() => {
    const total = userProperties.length;
    const sumPrice = userProperties.reduce(
      (s, p) => s + (Number(p.price) || 0),
      0
    );
    const avgPrice = total ? Math.round(sumPrice / total) : 0;

    // Calculate average rating from reviews for each property owned by user
    let totalRating = 0;
    let ratingCount = 0;
    userProperties.forEach((property) => {
      const propertyReviews = allReviews.filter(
        (r) =>
          r.propertyId === property._id ||
          r.propertyId?.toString() === property._id?.toString()
      );
      if (propertyReviews.length > 0) {
        const propAvgRating =
          propertyReviews.reduce(
            (sum, rev) => sum + (Number(rev.rating) || 0),
            0
          ) / propertyReviews.length;
        totalRating += propAvgRating;
        ratingCount++;
      }
    });

    const avgRating =
      ratingCount > 0 ? (totalRating / ratingCount).toFixed(2) : 0;

    const latest = [...userProperties]
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.postedDate) -
          new Date(a.createdAt || a.postedDate)
      )
      .slice(0, 3);

    return { total, avgPrice, avgRating, latest };
  }, [userProperties, allReviews]);

  const tagCounts = useMemo(() => {
    const map = {};
    userProperties.forEach((p) => {
      const tag = p.tag || p.category || "Unknown";
      map[tag] = (map[tag] || 0) + 1;
    });
    return map;
  }, [userProperties]);

  const categoryDistribution = useMemo(() => {
    const map = {};
    userProperties.forEach((p) => {
      const cat = p.category || p.type || "Unknown";
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [userProperties]);

  // Get ratings given by current user
  const myRatings = useMemo(() => {
    return allReviews.filter((r) => r.email === user?.email);
  }, [allReviews, user?.email]);

  // Calculate top properties by average rating
  const topPropertiesByRating = useMemo(() => {
    return userProperties
      .map((p) => {
        const propertyReviews = allReviews.filter(
          (r) =>
            r.propertyId === p._id ||
            r.propertyId?.toString() === p._id?.toString()
        );
        const avgRating =
          propertyReviews.length > 0
            ? propertyReviews.reduce(
                (sum, rev) => sum + (Number(rev.rating) || 0),
                0
              ) / propertyReviews.length
            : 0;
        return {
          title: p.title || p.propertyName || "Untitled",
          avgRating,
          reviewCount: propertyReviews.length,
        };
      })
      .filter((p) => p.reviewCount > 0)
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 8);
  }, [userProperties, allReviews]);

  if (loading) return <Loading></Loading>;

  if (error)
    return (
      <div className="p-4 md:p-6 text-red-600">
        Failed to load data: {error}
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#108251] dark:text-green-400 mb-2 font-primary">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-secondary">
          Your property statistics and insights
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-100 rounded-lg shadow-lg p-6 border-l-4 border-[#108251]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary">
                Total Properties
              </p>
              <p className="text-3xl font-bold text-[#108251] dark:text-green-400 mt-2">
                {stats.total}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary">
                Average Price
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                ${stats.avgPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary">
                Average Rating
              </p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                {stats.avgRating} ★
              </p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary mb-3">
              Recent Properties
            </p>
            {stats.latest.length === 0 ? (
              <p className="text-gray-400 text-sm">No properties yet</p>
            ) : (
              <div className="space-y-2">
                {stats.latest.map((p) => (
                  <div key={p._id} className="text-xs">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {p.title || p.propertyName || "Untitled"}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      ${p.price}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Charts & Stats */}
      <div className="space-y-6">
        {/* Pie Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tag Distribution - Pie Chart */}
          <div className="bg-base-100 rounded-lg shadow-lg p-6 border border-[#108251]">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-primary">
              Properties by Tag
            </h2>
            {Object.keys(tagCounts).length === 0 ? (
              <p className="text-gray-500">No data available</p>
            ) : (
              <div className="flex justify-center">
                <Pie
                  data={{
                    labels: Object.keys(tagCounts),
                    datasets: [
                      {
                        data: Object.values(tagCounts),
                        backgroundColor: [
                          "#108251",
                          "#3b82f6",
                          "#f59e0b",
                          "#ef4444",
                          "#8b5cf6",
                        ],
                        borderColor: [
                          "#0d5f3f",
                          "#1d4ed8",
                          "#d97706",
                          "#dc2626",
                          "#7c3aed",
                        ],
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          padding: 15,
                          font: { size: 12 },
                          color:
                            document.documentElement.getAttribute(
                              "data-theme"
                            ) === "dark"
                              ? "#d1d5db"
                              : "#374151",
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Category Distribution - Pie Chart */}
          <div className="bg-base-100 rounded-lg shadow-lg p-6 border border-[#108251]">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-primary">
              Properties by Category
            </h2>
            {Object.keys(categoryDistribution).length === 0 ? (
              <p className="text-gray-500">No data available</p>
            ) : (
              <div className="flex justify-center">
                <Pie
                  data={{
                    labels: Object.keys(categoryDistribution),
                    datasets: [
                      {
                        data: Object.values(categoryDistribution),
                        backgroundColor: [
                          "#06b6d4",
                          "#ec4899",
                          "#14b8a6",
                          "#f97316",
                          "#6366f1",
                        ],
                        borderColor: [
                          "#0891b2",
                          "#be185d",
                          "#0d9488",
                          "#ea580c",
                          "#4f46e5",
                        ],
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          padding: 15,
                          font: { size: 12 },
                          color:
                            document.documentElement.getAttribute(
                              "data-theme"
                            ) === "dark"
                              ? "#d1d5db"
                              : "#374151",
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Top Properties by Rating - Bar Chart */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6 border border-[#108251]">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-primary">
            Top Properties by Rating
          </h2>
          {topPropertiesByRating.length === 0 ? (
            <p className="text-gray-500">No rated properties yet</p>
          ) : (
            <div className="flex justify-center">
              <Bar
                data={{
                  labels: topPropertiesByRating.map((p) => p.title),
                  datasets: [
                    {
                      label: "Average Rating",
                      data: topPropertiesByRating.map((p) => p.avgRating),
                      backgroundColor: "#f59e0b",
                      borderColor: "#d97706",
                      borderWidth: 2,
                      borderRadius: 4,
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        padding: 15,
                        font: { size: 12 },
                        color:
                          document.documentElement.getAttribute(
                            "data-theme"
                          ) === "dark"
                            ? "#d1d5db"
                            : "#374151",
                      },
                    },
                    tooltip: {
                      callbacks: {
                        afterLabel: function (context) {
                          const reviewCount =
                            topPropertiesByRating[context.dataIndex]
                              .reviewCount;
                          return `Reviews: ${reviewCount}`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      min: 0,
                      max: 5,
                      ticks: {
                        color:
                          document.documentElement.getAttribute(
                            "data-theme"
                          ) === "dark"
                            ? "#9ca3af"
                            : "#6b7280",
                      },
                      grid: {
                        color:
                          document.documentElement.getAttribute(
                            "data-theme"
                          ) === "dark"
                            ? "#374151"
                            : "#e5e7eb",
                      },
                    },
                    y: {
                      ticks: {
                        color:
                          document.documentElement.getAttribute(
                            "data-theme"
                          ) === "dark"
                            ? "#9ca3af"
                            : "#6b7280",
                      },
                      grid: {
                        color:
                          document.documentElement.getAttribute(
                            "data-theme"
                          ) === "dark"
                            ? "#374151"
                            : "#e5e7eb",
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden border border-[#108251]">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-primary">
            My Properties
          </h2>
        </div>

        {userProperties.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No properties yet. Start by adding your first property!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Title
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                    Price
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    Tag
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {userProperties.map((p) => {
                  // Calculate average rating for this property from reviews
                  const propertyReviews = allReviews.filter(
                    (r) =>
                      r.propertyId === p._id ||
                      r.propertyId?.toString() === p._id?.toString()
                  );
                  const propertyAvgRating =
                    propertyReviews.length > 0
                      ? (
                          propertyReviews.reduce(
                            (sum, rev) => sum + (Number(rev.rating) || 0),
                            0
                          ) / propertyReviews.length
                        ).toFixed(2)
                      : null;

                  return (
                    <tr
                      key={p._id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                        <p className="font-medium truncate">
                          {p.title || p.propertyName || "Untitled"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {p.location?.city || p.location || "—"}
                        </p>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-[#108251] font-bold dark:text-gray-200 hidden sm:table-cell">
                        {p.tag === "For Rent"
                          ? `$${p.price.toLocaleString()}/week`
                          : `$${p.price.toLocaleString()}`}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-800 dark:text-gray-200 hidden md:table-cell">
                        <span className="px-2 py-1 bg-green-200 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                          {p.category || p.type || "—"}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-800 dark:text-gray-200 hidden md:table-cell">
                        <span className="px-2 py-1 badge bg-[#108251] text-white rounded-full text-xs">
                          {p.tag || p.type || "—"}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-800 dark:text-gray-200 hidden lg:table-cell">
                        {propertyAvgRating ? (
                          <span className="flex items-center gap-1">
                            <span className="font-semibold">
                              {propertyAvgRating}
                            </span>
                            <span className="text-yellow-500">★</span>
                            <span className="text-xs text-gray-500">
                              ({propertyReviews.length})
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-400">No ratings</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* My Ratings Section */}
      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden border border-[#108251]">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-primary">
            My Ratings to Other Properties
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary mt-1">
            Ratings and reviews you've given to other properties
          </p>
        </div>

        {myRatings.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            You haven't rated any properties yet. Start exploring and share your
            feedback!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Property Name
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                    Rating
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    Review
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {myRatings.map((rating) => (
                  <tr
                    key={rating._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                      <p className="font-medium truncate">
                        {rating.propertyName || "Unknown Property"}
                      </p>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-800 dark:text-gray-200 hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={`${
                              i < rating.rating
                                ? "text-yellow-500"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-2 font-semibold">
                          {rating.rating}.0
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700 dark:text-gray-300 hidden md:table-cell">
                      <p className="truncate max-w-xs">
                        {rating.review || "—"}
                      </p>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                      {new Date(rating.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
