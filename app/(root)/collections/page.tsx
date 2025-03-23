"use client";

import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux store config..
import { RootState } from "@/app/store/store";

const Collections = () => {
  const collections = useSelector(
    (state: RootState) => state.collections.collections
  );

  console.log("Collections: ", collections);

  return (
    <div className="bg-[#5c566d] min-h-screen">
      <h2 className="text-xl font-bold">Collections</h2>
      <p className="text-black">
        Explore the world through collections of beautiful images free to use
        under the
        <a href="#" className="text-blue-500">
          Unsplash License
        </a>
      </p>
      <div className="flex items-center justify-center min-h-screen bg-white p-8">
        {collections.length > 0 &&
          collections.map((item, index) => (
            <div
              key={index}
              className="w-[600px] bg-white rounded-lg shadow-lg p-4"
            >
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 relative overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-cover motion-blur"
                    src={`${item.images[0]}`}
                    alt="Blurred"
                  />
                </div>
                <div className="grid grid-rows-2 gap-2">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover motion-blur"
                      src={`${item.images[1]}`}
                      alt="Blurred Small"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover motion-blur"
                      src={`${item.images[2]}`}
                      alt="Blurred Small"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{item.description}</h2>
                <p className="text-gray-500 text-sm">
                  {item.images.length} images · Curated by Unsplash+ Collections
                </p>
                <div className="mt-2 flex space-x-2">
                  <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Collections;
