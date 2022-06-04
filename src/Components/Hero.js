import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../images/hero.png";

const Hero = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Learning Language
            <br className="hidden lg:inline-block" />
            With Watching Movie
          </h1>
          <p className="mb-8 leading-relaxed">
            LLWWM is a powerful toolbox for learning languages. It helps you to
            discover, understand, and learn from native materials. Studying will
            become more effective, interesting, and enjoyable!
          </p>
          <div className="flex justify-center">
            <Link
              to="/watch"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="lg:flex-grow lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={heroImg}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
