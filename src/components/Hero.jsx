import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FiPlay, FiPause } from "react-icons/fi";
import heroImg1 from "../assets/Hero-banner.jpg";
import heroImg2 from "../assets/Hero-banner-2.jpg";
import heroImg3 from "../assets/Hero-banner-3.jpg";
import SearchBar from "./SearchBar";

const Hero = () => {
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  const heroImages = [heroImg1, heroImg2, heroImg3];

  return (
    <div className="relative w-full">
      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-[650px] md:h-[700px] lg:h-[750px]"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt="Hero Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content inside hero (not removing from flow) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20 gap-4 z-10">
        <p className="btn btn-success rounded-full cursor-default font-secondary">
          Welcome to HomeNest
        </p>
        <h2 className="font-primary text-3xl md:text-6xl font-black text-white max-w-3xl pb-5">
          Find your <span className="text-[#48e9a8]">dream</span> home in the
          best location
        </h2>
        <div className="w-full max-w-6xl">
          <SearchBar />
        </div>
      </div>

      {/* Play/Pause button */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-5 right-5 md:bottom-10 md:right-10 bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 text-black dark:text-white rounded-full p-3 z-20 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
      >
        {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
      </button>
    </div>
  );
};

export default Hero;
