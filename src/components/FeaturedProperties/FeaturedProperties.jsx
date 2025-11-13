import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaBed, FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TbFileDescription } from "react-icons/tb";
import Loading from "../Loading";
import "./FeaturedProperties.css";
import { Link } from "react-router";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://b12a10-homenest-api-server.vercel.app/properties/featured")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="py-20 bg-linear-to-tl from-green-100 via-green-50 to-green-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-700 text-base-content dark:text-gray-200 transition-colors duration-300 px-5 md:px-20">
      <div className="mx-auto">
        {/* Heading & Button */}
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center text-center md:text-left mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-primary text-gray-900 dark:text-gray-100 leading-tight">
            Discover Our <br />
            <span className="text-[#108251]">Featured Properties</span> Now
          </h2>
          <Link
            to={"/allProperties"}
            className="mt-3 md:mt-0 flex items-center justify-center rounded-full text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200 border border-[#108251] px-4 py-2 btn btn-soft btn-success transition duration-300 hover:text-white font-primary"
          >
            View All Properties
            <span className="ml-2 text-base">↗</span>
          </Link>
        </div>

        <div className="relative flex items-center px-5">
          {/* Previous Arrow */}
          <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -left-4 md:-left-10 z-20 text-[#108251] text-3xl md:text-4xl cursor-pointer p-1 md:p-2 transition duration-300 hover:scale-110">
            <FaArrowLeft />
          </div>

          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ el: ".custom-pagination-dots", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={20}
            slidesPerView={1}
            slidesPerGroup={1}
            breakpoints={{
              768: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
            className="w-full"
          >
            {properties.map((p) => {
              const isTruncated = p.description.length > 50;
              const shortDescription = isTruncated
                ? p.description.slice(0, 50)
                : p.description;

              return (
                <SwiperSlide key={p.id}>
                  <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-shadow duration-300 hover:shadow-xl w-full h-full lg:h-[600px] flex flex-col justify-between grow">
                    {/* Image */}
                    <div className="relative h-64 w-full shrink-0">
                      <img
                        src={p.image}
                        alt={p.propertyName}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`badge absolute top-4 right-4 text-white text-xs font-bold p-2 border-0 rounded-full ${
                          p.tag === "For Sale" ? "bg-[#108251]" : "bg-info"
                        }`}
                      >
                        {p.tag}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      {/* Features */}
                      <div className="flex justify-around items-center pb-4 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex items-center text-sm font-medium">
                          <FaBed className="mr-2 text-base text-gray-700 dark:text-gray-200" />
                          {p.beds} Bed
                        </div>
                        <span>|</span>
                        <div className="flex items-center text-sm font-medium">
                          <FaBath className="mr-2 text-base text-gray-700 dark:text-gray-200" />
                          {p.baths} Bath
                        </div>
                        <span>|</span>
                        <div className="flex items-center text-sm font-medium">
                          <BiArea className="mr-2 text-base text-gray-700 dark:text-gray-200" />
                          {p.area} m²
                        </div>
                      </div>

                      {/* Title, Address, Price, Description */}
                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100 font-primary">
                            {p.propertyName}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 flex items-start">
                            <IoLocationSharp className="mt-1 mr-1 text-base text-gray-400 dark:text-gray-300" />
                            {p.location}
                          </p>
                          {/* Truncated Description with inline "Read More" */}
                          <div className="text-sm text-base-content/80 mb-3 font-secondary flex items-start">
                            <TbFileDescription className="mt-1 mr-1 text-base text-gray-400 dark:text-gray-300" />
                            {isTruncated ? (
                              <p>
                                {shortDescription}
                                <span>... </span>
                                <Link
                                  to={`/propertyDetails/${p._id}`}
                                  className="text-[#108251] hover:underline hover:text-success font-semibold text-xs"
                                >
                                  Read More
                                </Link>
                              </p>
                            ) : (
                              p.description
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="text-[#108251] dark:text-[#60e0a9] text-2xl font-bold mb-4 font-secondary">
                              {p.tag === "For Sale"
                                ? `$${p.price.toLocaleString()}`
                                : `$${p.price} / Week`}
                            </div>
                            <p className="mb-4 font-secondary btn btn-outline btn-success rounded-full h-7 cursor-default">
                              {p.category}
                            </p>
                          </div>
                          <Link
                            to={`/propertyDetails/${p._id}`}
                            className="bg-gray-900 rounded-full dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold px-6 py-2 transition duration-300 hover:bg-[#108251] dark:hover:bg-[#108251] dark:hover:text-white cursor-pointer btn w-full"
                          >
                            See Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Next Arrow */}
          <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -right-4 md:-right-10 z-20 text-[#108251] text-3xl md:text-4xl cursor-pointer p-1 md:p-2 transition duration-300 hover:scale-110">
            <FaArrowRight />
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="custom-pagination-dots mt-10 flex justify-center"></div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
