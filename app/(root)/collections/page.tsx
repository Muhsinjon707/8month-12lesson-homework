"use client";

// Next
import { useRouter } from "next/navigation";

// React
import React from "react";

// React icons
import { FiMinus } from "react-icons/fi";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux actions
import { deleteCollection } from "@/app/store/slice/collectionsSlice";

// Redux store config..
import { RootState } from "@/app/store/store";

// Project components
import Image from "@/app/components/Image";

// Framer motion
import { motion } from "framer-motion";

const Collections = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const collections = useSelector(
    (state: RootState) => state.collections.collections,
  );

  const dispatch = useDispatch();

  function handleDeleteCollection(id: string) {
    if (window.confirm("Do you want to delete this")) {
      dispatch(deleteCollection(id));
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center gap-10">
      <div className={`mt-25 ${darkMode ? "text-white" : "text-black"}`}>
        <h2 className="text-5xl font-bold">Collections</h2>
        <p className="flex gap-1 pl-1 text-xl">
          Explore the world through collections of beautiful images free to use
          under the
          <a
            href="#"
            className={
              darkMode ? "text-violet-500 underline" : "text-gray-300 underline"
            }
          >
            Unsplash License
          </a>
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`mb-20 flex flex-wrap items-center gap-8 p-1 justify-start `}
      >
        {collections.length > 0 &&
          collections.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key={index}
                className={`h-[400px] w-full max-w-[400px] overflow-hidden rounded-lg p-4 shadow-xl transition-shadow duration-300 ease-in hover:shadow-2xl ${darkMode ? "bg-[#292434]" : "bg-white"} `}
              >
                <Image images={item.images} />
                <div className="mt-4 flex h-full max-h-[100px] flex-col justify-between">
                  <div className={`${darkMode ? "text-white" : "text-black"}`}>
                    <h2
                      title="Collection description"
                      className="text-lg font-semibold"
                    >
                      {item.description
                        ? item.description
                        : "No description available"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.images.length} images · Curated by Unsplash+
                      Collections
                    </p>
                  </div>
                  <div className="mt-2 flex w-full justify-between space-x-2">
                    <span
                      className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700"
                      title="Collection name"
                    >
                      {item.name}
                    </span>
                    <motion.button
                      onClick={() => handleDeleteCollection(item.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`transition-bg cursor-pointer rounded-full p-1 duration-150 ease-linear hover:bg-gray-300 ${darkMode ? "text-white" : "text-black"} `}
                      title="Remove a collection"
                    >
                      <FiMinus />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </motion.div>
    </div>
  );
};

export default Collections;
