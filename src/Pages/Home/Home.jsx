import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import LatestCrops from "./LatestCrops";
import HeroSlider from "./HeroSlider";
import MeetExpert from "./MeetExpert";
import WorkSection from "./WorkSection";
import Blogs from "./Blogs";
import TestimonialsSection from "./TestimonialsSection";
import FeaturesSection from "./FeaturesSection";
import CategoriesSection from "./CategoriesSection";
import StatsSection from "./StatsSection";
import NewsletterSection from "./NewsletterSection";

const latestCropsPromise = fetch("http://localhost:3000/latestCrops").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>

      <FeaturesSection></FeaturesSection>

      <LatestCrops latestCropsPromise={latestCropsPromise}></LatestCrops>

      <CategoriesSection></CategoriesSection>

      <WorkSection></WorkSection>

      <StatsSection></StatsSection>

      <TestimonialsSection></TestimonialsSection>

      <MeetExpert></MeetExpert>

      <Blogs></Blogs>
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
