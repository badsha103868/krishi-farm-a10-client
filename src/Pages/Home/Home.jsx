import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import LatestCrops from "./LatestCrops";
import HeroSlider from "./HeroSlider";
import MeetExpert from "./MeetExpert";
import WorkSection from "./WorkSection";
import Blogs from "./Blogs";
import TestimonialsSection from "./TestimonialsSection";

const latestCropsPromise = fetch("http://localhost:3000/latestCrops").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <LatestCrops latestCropsPromise={latestCropsPromise}></LatestCrops>
      <WorkSection></WorkSection>
      <TestimonialsSection></TestimonialsSection>
      <MeetExpert></MeetExpert>
      <Blogs></Blogs>
    </div>
  );
};

export default Home;
