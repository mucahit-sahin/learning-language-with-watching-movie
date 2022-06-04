import React from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Steps from "./Steps";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <Hero />
      <Steps />
      <Footer />
    </div>
  );
};

export default Home;
