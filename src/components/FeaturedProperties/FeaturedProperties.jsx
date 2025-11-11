import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaBed, FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Maple Ridge Apartments",
      address: "382 Blue Sky Boulevard, Oakwood Residences, CO 80202",
      price: "$85,000",
      beds: 5,
      baths: 4,
      area: "1600 Sqft",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3825b?q=80&w=2070&auto=format&fit=crop",
      tag: "For Sale",
    },
    {
      id: 2,
      title: "Lakeside Manor",
      address: "4345 Maplewood Drive, Evergreen Estates, CA 90210",
      price: "$50,000",
      beds: 3,
      baths: 3,
      area: "1200 Sqft",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
      tag: "For Sale",
    },
    {
      id: 3,
      title: "Golden Meadows",
      address: "4345 Maplewood Drive, Evergreen Estates, CA 90210",
      price: "$50,000",
      beds: 3,
      baths: 3,
      area: "1200 Sqft",
      image:
        "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2070&auto=format&fit=crop",
      tag: "For Sale",
    },
    {
      id: 4,
      title: "Villa In Oglesby Ave",
      address: "1035 Oglesby Ave, Chicago, IL 60617",
      price: "$130,000 /month",
      beds: 4,
      baths: 3,
      area: "800 sq ft",
      image:
        "https://images.unsplash.com/photo-1605146768851-eda79da39897?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
    },
    {
      id: 5,
      title: "Modern Loft",
      address: "42 Wallaby Way, Sydney, NSW 2000",
      price: "$95,000 /month",
      beds: 2,
      baths: 2,
      area: "900 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
    },
    {
      id: 6,
      title: "Modern Loft",
      address: "42 Wallaby Way, Sydney, NSW 2000",
      price: "$95,000 /month",
      beds: 2,
      baths: 2,
      area: "900 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
    },
    {
      id: 7,
      title: "Modern Loft",
      address: "42 Wallaby Way, Sydney, NSW 2000",
      price: "$95,000 /month",
      beds: 2,
      baths: 2,
      area: "900 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
    },
    {
      id: 8,
      title: "Modern Loft",
      address: "42 Wallaby Way, Sydney, NSW 2000",
      price: "$95,000 /month",
      beds: 2,
      baths: 2,
      area: "900 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
    },
    {
      id: 9,
      title: "Modern Loft",
      address: "42 Wallaby Way, Sydney, NSW 2000",
      price: "$95,000 /month",
      beds: 2,
      baths: 2,
      area: "900 sq ft",
      image:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
      tag: "For Rent",
    },
  ];

  return (
    <section className="py-16 transition-colors duration-300  bg-base-300 dark:bg-gray-900">
      <div className="mx-auto px-10">
        <div className="flex justify-between items-center mb-12 px-10">
          <h2 className="text-4xl font-bold font-primary text-gray-900 dark:text-gray-100 leading-tight">
            Discover Our Featured Properties Now
          </h2>
          <button className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 border border-[#108251] px-4 py-2 btn btn-soft btn-success transition duration-300 hover:text-white font-primary">
            View All Properties
            <span className="text-base">↗</span>
          </button>
        </div>

        <div className="relative flex items-center">
          {/* Previous Arrow */}
          <div className="swiper-button-prev-custom absolute -left-10 z-20 text-[#108251] text-4xl cursor-pointer p-2 transition duration-300 hover:scale-110 ml-1 md:ml-5">
            <FaArrowLeft />
          </div>

          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{
              el: ".custom-pagination-dots",
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={30}
            slidesPerView={1}
            slidesPerGroup={1}
            breakpoints={{
              768: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
            className="w-11/12"
          >
            {properties.map((p) => (
              <SwiperSlide key={p.id}>
                <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-shadow duration-300 hover:shadow-xl w-full h-[520px] flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 w-full shrink-0">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#108251] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {p.tag}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    {/* Features */}
                    <div className="flex justify-around items-center pb-4 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center text-sm font-medium">
                        <FaBed className="mr-2 text-base text-gray-700 dark:text-gray-200" />{" "}
                        {p.beds} Bed
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <FaBath className="mr-2 text-base text-gray-700 dark:text-gray-200" />{" "}
                        {p.baths} Bath
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <BiArea className="mr-2 text-base text-gray-700 dark:text-gray-200" />{" "}
                        {p.area}
                      </div>
                    </div>

                    {/* Title, Address, Price, Button */}
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100 font-primary">
                          {p.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 flex items-center">
                          <IoLocationSharp className="mr-1 text-base text-gray-400 dark:text-gray-300" />{" "}
                          {p.address}
                        </p>
                        <p className="text-[#108251] text-xl font-bold mb-4 font-secondary">
                          {p.price}
                        </p>
                      </div>
                      <button className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold px-6 py-2 rounded-md transition duration-300 hover:bg-[#108251] dark:hover:bg-[#108251] dark:hover:text-white">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Next Arrow */}
          <div className="swiper-button-next-custom absolute -right-10 z-20 text-[#108251] text-4xl cursor-pointer p-2 transition duration-300 hover:scale-110 mr-1 md:mr-5">
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
