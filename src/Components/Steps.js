import React, { useState } from "react";

const Steps = () => {
  var steps = [
    {
      title: "Select a word",
      description: "Select a word from the list of words",
      image: "https://i.imgur.com/XqQXQZb.png",
    },
    {
      title: "Translate the word",
      description: "Translate the word to your language",
      image: "https://i.imgur.com/XqQXQZb.png",
    },
    {
      title: "Learn the word",
      description: "Learn the word and its meaning",
      image: "https://i.imgur.com/XqQXQZb.png",
    },
  ];
  return (
    <section className="text-gray-600 body-font bg-gray-900">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            <div className="flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10"></div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">
                  STEP 1
                </h2>
                <p className="leading-relaxed">
                  VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk
                  bespoke try-hard cliche palo santo offal.
                </p>
              </div>
            </div>
          </div>
          <img
            className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
            src="https://dummyimage.com/1200x500"
            alt="step"
          />
        </div>
      </div>
    </section>
  );
};

export default Steps;
