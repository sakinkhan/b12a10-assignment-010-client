import React from "react";
import about1Img from "../assets/about-us-1.jpg";
import about2Img from "../assets/about-us-2.jpg";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="px-5 md:px-20 py-16 bg-green-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-primary font-bold text-[#108251] dark:text-white leading-tight">
          Get to Know Who We Aret
          <br />& What Drives Us
        </h1>
        <button className="flex items-center rounded-full text-[16px] font-semibold text-gray-700 dark:text-gray-200 border border-[#108251] px-4 py-2 transition duration-300 hover:bg-[#108251] hover:text-white font-primary">
          Learn More<span className="ml-2">↗</span>
        </button>
      </div>
      {/* Images */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-10 mb-16 px-5">
        <img
          src={about1Img}
          alt="About image 1"
          className="w-full sm:w-3/4 md:w-full lg:w-1/2 h-90 rounded-3xl object-cover shadow-lg transform hover:scale-105 transition-all duration-300"
        />
        <img
          src={about2Img}
          alt="About image 2"
          className="w-full sm:w-3/4 md:w-full lg:w-1/2 h-90 rounded-3xl object-cover shadow-lg transform hover:scale-105 transition-all duration-300"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Card 1 */}
        <div className="flex flex-col items-center md:items-start">
          <div
            className="bg-[#108251] dark:bg-green-700 p-5 rounded-full mb-5 text-white w-fit transform transition-transform duration-500 
          hover:rotate-15"
          >
            <IoShieldCheckmarkOutline size={35} />
          </div>
          <h2 className="text-2xl font-primary font-semibold text-gray-900 dark:text-white mb-2">
            Trusted Partner
          </h2>
          <p className="text-base md:text-lg font-secondary text-gray-700 dark:text-gray-300 leading-relaxed px-15 md:px-0">
            With a commitment to transparency and integrity, we build lasting
            relationships and guide you through every step of your property
            journey.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center md:items-start">
          <div
            className="bg-[#108251] dark:bg-green-700 p-5 rounded-full mb-5 text-white w-fit transform transition-transform duration-500 
          hover:-rotate-15"
          >
            <BsPersonWorkspace size={35} />
          </div>
          <h2 className="text-2xl font-primary font-semibold text-gray-900 dark:text-white mb-2">
            Personalized Service
          </h2>
          <p className="text-base md:text-lg font-secondary text-gray-700 dark:text-gray-300 leading-relaxed px-15 md:px-0">
            We understand that each client has unique needs, offering customized
            solutions that fit your specific goals and preferences.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center md:items-start">
          <div
            className="bg-[#108251] dark:bg-green-700 p-5 rounded-full mb-5 text-white w-fit transform transition-transform duration-500
          hover:rotate-15"
          >
            <FaUsersCog size={35} />
          </div>
          <h2 className="text-2xl font-primary font-semibold text-gray-900 dark:text-white mb-2">
            Experienced Team
          </h2>
          <p className="text-base md:text-lg font-secondary text-gray-700 dark:text-gray-300 leading-relaxed px-15 md:px-0">
            Our team of real estate experts brings years of industry knowledge
            to help you make informed decisions in buying or selling properties.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
