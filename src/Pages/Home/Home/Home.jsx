import React from "react";
import Bannar from "../../../Components/Bannar/Bannar";
import TopScholarships from "../../Scholarships/TopScholarships/TopScholarships";
import SuccessStories from "../SuccessStories/SuccessStories";
import FAQ from "../FAQ/FAQ";
import Statistics from "../../../Components/Statistics/Statistics";

const Home = () => {
  return (
    <div>
      <Bannar></Bannar>
      <TopScholarships></TopScholarships>
      <SuccessStories />
      <Statistics></Statistics>
      <FAQ />
    </div>
  );
};

export default Home;
