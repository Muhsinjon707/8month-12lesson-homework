"use client";

// React
import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Redux store config.
import { RootState } from "../store/store";

// Redux slice
import { closeImageModal } from "../store/slice/modalSlice";

// Icons
import { CiCalendar } from "react-icons/ci";
import { FaHeart, FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdBrowserUpdated } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";

// Addition libraries
import { motion } from "framer-motion";
import { UnsplashPhoto } from "../model/UnspashPhoto";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/slice/favoritesSlice";

// Date formatting function
const formatDate = (isoDate?: string) => {
  if (!isoDate) return "No date available";
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ImageModal: React.FC = () => {
  const [changeDownload, setDownload] = useState(false);

  const dispatch = useDispatch();
  const { isOpen, imageData } = useSelector(
    (state: RootState) => state.modal.imageModal
  );

  // Favorites config.
  const favoritesList = useSelector(
    (state: RootState) => state.liked.likedImages
  );

  // Check if image is in favorites
  const isFavorite = (imageId: string) =>
    favoritesList.some((item) => item.id === imageId);

  // Handle Add/Remove from Favorites
  function handleAddToFavorites(image: UnsplashPhoto) {
    if (isFavorite(image.id)) {
      dispatch(removeFromFavorites(image.id));
    } else {
      dispatch(addToFavorites(image));
    }
  }

  if (!isOpen || !imageData) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => dispatch(closeImageModal())}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <button
        className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
        onClick={() => dispatch(closeImageModal())}
        title="Close modal"
      >
        ✕
      </button>

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 w-[80%] min-h-[90%] rounded-lg shadow-lg max-w-5xl flex flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="rounded-full w-12 h-12"
              src={
                imageData.user?.profile_image?.small ?? "/default-avatar.png"
              }
              alt={imageData.user?.name ?? "Unknown user"}
            />
            <div className="flex flex-col">
              <span className="font-semibold">
                {imageData.user?.username ?? "Unknown"}
              </span>
              <span className="text-sm text-gray-500">
                {imageData?.user?.bio?.split(" ").slice(0, 5).join(" ") ||
                  "No bio available"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleAddToFavorites(imageData)}
              className={`
                rounded-lg transition px-3
                ${
                  isFavorite(imageData.id)
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
                }
              `}
            >
              <FaHeart />
            </button>
            <button className="px-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              <FaPlus />
            </button>
            <div className="flex">
              <a
                href={imageData.links.download + "&force=true"}
                className="px-4 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300 transition"
              >
                Download
              </a>
              <div className="group relative transition duration-300 ease-in-out">
                <button
                  onClick={() => setDownload(!changeDownload)}
                  className="px-3 py-3 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                >
                  <IoIosArrowDown />
                </button>
                <ul
                  className={`
                    ${
                      changeDownload
                        ? "opacity-100 visible scale-100"
                        : "opacity-0 invisible scale-95"
                    } 
                    absolute top-11 right-0 bg-white shadow-lg rounded-lg w-48 
                    transition-all duration-300 ease-in-out transform origin-top-right
                    border border-gray-300 overflow-hidden
                  `}
                >
                  <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Small <span className="text-gray-500">(640x426)</span>
                  </li>
                  <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Medium <span className="text-gray-500">(1920x1280)</span>
                  </li>
                  <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Large <span className="text-gray-500">(2400x1600)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          src={imageData.urls.regular}
          alt={imageData.alt_description || "Unsplash Image"}
          className="w-full max-h-[500px] object-cover rounded-lg"
        />

        {imageData.description && (
          <h3 className="text-lg font-semibold">{imageData.description}</h3>
        )}

        <div className="text-sm text-gray-600 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CiCalendar />
            <span>Published on {formatDate(imageData.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineLike />
            <span>Likes: {imageData.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdBrowserUpdated />
            <span>Updated on {formatDate(imageData.updated_at)}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageModal;
