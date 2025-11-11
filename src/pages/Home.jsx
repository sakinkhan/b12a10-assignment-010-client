import React from "react";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import LatestProperties from "../components/FeaturedProperties/FeaturedProperties";
import FeaturedProperties from "../components/FeaturedProperties/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import MeetAgents from "../components/MeetAgents/MeetAgents";
import SimpleSteps from "../components/SimpleSteps";
import AboutUs from "../components/AboutUs";

const Home = () => {
  return (
    <div>
      <title>HomeNest - Home</title>
      <Hero></Hero>
      <FeaturedProperties></FeaturedProperties>
      <WhyChooseUs></WhyChooseUs>
      <MeetAgents></MeetAgents>
      <SimpleSteps></SimpleSteps>
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;
