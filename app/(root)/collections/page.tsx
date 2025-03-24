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
    (state: RootState) => state.collections.collections
  );

  const dispatch = useDispatch();

  function handleDeleteCollection(id: string) {
    if (window.confirm("Do you want to delete this")) {
      dispatch(deleteCollection(id));
    }
  }

  // const router = useRouter();
  // const handleRedirect = (id: string) => {
  //   router.push(`collections/${id}`);
  // };

  return (
    <div className="min-h-screen container max-w-7xl flex flex-col gap-10 items-start justify-center mx-auto">
      <div
        className={`mt-25 ${darkMode == "dark" ? "text-white" : "text-black"}`}
      >
        <h2 className="text-5xl font-bold">Collections</h2>
        <p className="text-xl flex gap-1 pl-1">
          Explore the world through collections of beautiful images free to use
          under the
          <a
            href="#"
            className={
              darkMode == "dark"
                ? "text-violet-500 underline"
                : "text-gray-300 underline"
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
        className={`
          flex gap-8 items-center p-1 flex-wrap mb-20
          ${collections.length > 3 ? "justify-between" : "justify-center"} 
        `}
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
                className={`
                  max-w-[400px] w-full h-[400px] rounded-lg shadow-xl p-4 overflow-hidden
                  transition-shadow duration-300 ease-in hover:shadow-2xl 
                  ${darkMode == "dark" ? "bg-[#292434]" : "bg-white"}  
                `}
              >
                <Image images={item.images} />
                <div className="flex flex-col justify-between mt-4 max-h-[100px] h-full">
                  <div
                    className={`${
                      darkMode == "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    <h2
                      title="Collection description"
                      className="text-lg font-semibold"
                    >
                      {item.description
                        ? item.description
                        : "No description available"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {item.images.length} images · Curated by Unsplash+
                      Collections
                    </p>
                  </div>
                  <div className="w-full mt-2 flex justify-between space-x-2">
                    <span
                      className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
                      title="Collection name"
                    >
                      {item.name}
                    </span>
                    <motion.button
                      onClick={() => handleDeleteCollection(item.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`
                        cursor-pointer hover:bg-gray-300 p-1 rounded-full
                        transition-bg duration-150 ease-linear 
                        
                        ${darkMode == "dark" ? "text-white" : "text-black"}
                      `}
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
