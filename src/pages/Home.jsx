import React from "react";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import LatestProperties from "../components/FeaturedProperties/FeaturedProperties";
import FeaturedProperties from "../components/FeaturedProperties/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <title>HomeNest - Home</title>
      <Hero></Hero>
      <FeaturedProperties></FeaturedProperties>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
