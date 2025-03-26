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
  const { data: images } = useCollection("downloads");

  // Modals configs.
  const { imageModal } = useSelector((state: RootState) => state.modal);

  // DarkMode
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div
      className={`mt-6 flex w-full flex-wrap items-start gap-5 ${images.length > 2 ? "justify-between" : "justify-center"} `}
    >
      {images.length > 0
        ? images.map((img) => {
            return (
              <div
                key={img.id}
                onClick={() => dispatch(openImageModal(img))}
                className={`flex max-h-[420px] w-[32%] flex-col items-start justify-start gap-2 rounded-lg p-4 shadow-lg hover:shadow-xl ${darkMode ? "shadow-0 bg-[#473e5a]" : "bg-white shadow-gray-400"} `}
              >
                <img
                  className="h-[200px] w-full rounded-lg object-cover"
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
                            {img.user.for_hire
                              ? "available"
                              : "no data about work"}
                          </span>
                        </h4>
                        <p className="w-40 truncate">
                          {img.user.bio ? img.user.bio : "No bio yet"}
                        </p>
                      </div>
                    </div>
                    <p className="w-80 truncate font-semibold">
                      {img.description}
                    </p>
                  </div>
                  <h4 className="mt-2 rounded-full bg-gray-500 px-2 text-white">
                    {img.asset_type}
                  </h4>
                </div>
              </div>
            );
          })
        : "No downloads yet"}

      {imageModal.isOpen && imageModal.imageData && <ImageModal />}
    </div>
  );
};

export default DownloadsList;
