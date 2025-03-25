"use client";

import React from "react";
import { UnsplashPhoto } from "../model/UnspashPhoto";
import { div } from "framer-motion/m";
import { userAgent } from "next/server";

// Modals
import ImageModal from "./ImageModal";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux slices
import { closeImageModal, openImageModal } from "../store/slice/modalSlice";

// Redux store config..
import { RootState } from "../store/store";
import { useCollection } from "../hooks/useCollection";

const DownloadsList = () => {
  const dispatch = useDispatch();

  // Cloud store
  const {data: images} = useCollection("downloads");

  // Modals configs.
  const { imageModal } = useSelector((state: RootState) => state.modal);

  // DarkMode
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div
      className={` 
        w-full mt-6 flex flex-wrap items-start gap-5 
        ${images.length > 2 ? "justify-between" : "justify-center"}
    `}
    >
      {images.map((img) => {
        return (
          <div
            key={img.id}
            onClick={() => dispatch(openImageModal(img))}
            className={`
                w-[32%] shadow-lg hover:shadow-xl max-h-[420px] 
                rounded-lg p-4 flex flex-col items-start justify-start gap-2  
                ${darkMode ? "bg-[#473e5a] shadow-0" : "bg-white shadow-gray-400"}
            `}
          >
            <img
              className="w-full h-[200px] object-cover rounded-lg"
              src={img.urls.regular}
              alt={img.alt_description}
              title={img.alt_description}
            />
            <div className="flex flex-col items-start justify-between gap-1">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full"
                    src={img.user.profile_image.small}
                    alt={img.user.name}
                  />
                  <div className="self-start">
                    <h4>
                      For hire:{" "}
                      <span className="font-semibold underline">
                        {img.user.for_hire ? "available" : "no data about work"}
                      </span>
                    </h4>
                    <p className="truncate w-40">
                      {img.user.bio ? img.user.bio : "No bio yet"}
                    </p>
                  </div>
                </div>
                <p className="font-semibold truncate w-80">{img.description}</p>
              </div>
              <h4 className="bg-gray-500 px-2 text-white mt-2 rounded-full">
                {img.asset_type}
              </h4>
            </div>
          </div>
        );
      })}

      {imageModal.isOpen && imageModal.imageData && <ImageModal />}
    </div>
  );
};

export default DownloadsList;
