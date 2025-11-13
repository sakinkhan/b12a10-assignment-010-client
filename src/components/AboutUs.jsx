import React from "react";
import about1Img from "../assets/about-us-1.jpg";
import about2Img from "../assets/about-us-2.jpg";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="px-5 md:px-20 py-20 bg-linear-to-br from-green-50 via-green-100 to-green-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Heading */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-primary font-bold text-gray-800 dark:text-white leading-tight text-center lg:text-left">
          Get to Know <span className="text-[#108251]">Who We Are</span>
          <br />& What Drives Us
        </h1>
        <button className="flex items-center rounded-full text-[16px] font-semibold text-gray-700 dark:text-gray-200 border border-[#108251] px-5 py-3 transition duration-300 hover:bg-[#108251] hover:text-white font-primary shadow hover:shadow-lg">
          Learn More<span className="ml-2">↗</span>
        </button>
      </div>

      {/* Images */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 mb-16 relative">
        {/* First Image */}
        <div className="w-full md:w-1/2 lg:w-1/2 relative">
          <img
            src={about1Img}
            alt="About image 1"
            className="w-full h-80 sm:h-96 md:h-96 rounded-3xl object-cover shadow-lg transform hover:scale-105 transition-all duration-300 z-20"
          />
        </div>

        {/* Second Image */}
        <div className="w-full md:w-1/2 lg:w-1/2 relative mt-0 md:mt-0 lg:-mt-24">
          <img
            src={about2Img}
            alt="About image 2"
            className="w-full h-80 sm:h-96 md:h-96 rounded-3xl object-cover shadow-lg transform hover:scale-105 transition-all duration-300 z-10"
          />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {[
          {
            icon: <IoShieldCheckmarkOutline size={35} />,
            title: "Trusted Partner",
            description:
              "With a commitment to transparency and integrity, we build lasting relationships and guide you through every step of your property journey.",
            hoverRotate: "rotate-12",
          },
          {
            icon: <BsPersonWorkspace size={35} />,
            title: "Personalized Service",
            description:
              "We understand that each client has unique needs, offering customized solutions that fit your specific goals and preferences.",
            hoverRotate: "-rotate-12",
          },
          {
            icon: <FaUsersCog size={35} />,
            title: "Experienced Team",
            description:
              "Our team of real estate experts brings years of industry knowledge to help you make informed decisions in buying or selling properties.",
            hoverRotate: "rotate-12",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:items-start bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div
              className={`bg-[#108251] dark:bg-green-700 p-5 rounded-full mb-5 text-white w-fit transform transition-transform duration-500 hover:${card.hoverRotate}`}
            >
              {card.icon}
            </div>
            <h2 className="text-2xl font-primary font-semibold text-gray-900 dark:text-white mb-3">
              {card.title}
            </h2>
            <p className="text-base md:text-lg font-secondary text-gray-700 dark:text-gray-300 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
