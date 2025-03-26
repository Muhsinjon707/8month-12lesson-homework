"use client";

import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// react-icons
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { HiArrowNarrowDown } from "react-icons/hi";

// Redux Store config...
import { RootState } from "../store/store";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux Modal
import {
  closeCollectionModal,
  closeImageModal,
  openCollectionModal,
  openImageModal,
} from "../store/slice/modalSlice";

// Modals (Image Modal & CollectionModal)
import ImageModal from "./ImageModal";
import CollectionModal from "./CollectionModal";

// Interface import
import { UnsplashPhoto } from "../model/UnspashPhoto";

// Framer motion
import { motion } from "framer-motion";

// Redux | Modal actions
import { closeWindow } from "../store/slice/burgerMenuSlice";

// useFirestore
import { useFirestore } from "../hooks/useFirestore";
import { useCollection } from "../hooks/useCollection";

interface ImageLayoutProps {
  images: UnsplashPhoto[];
}

const ImageLayout: React.FC<ImageLayoutProps> = ({ images }) => {
  const dispatch = useDispatch();

  // Modals configs.
  const { imageModal, collectionModal } = useSelector(
    (state: RootState) => state.modal,
  );

  // =======================================================================

  // Favorites config.
  const { data: favoritesList } = useCollection("favorites");

  // Check if image is in favorites
  const isFavorite = (imageId: string) =>
    favoritesList.some((item) => item.id === imageId);

  const { addDocumentToFavorites, deleteDocumentFromFavorites } =
    useFirestore();

  // Handle Add/Remove from Favorites
  function handleAddToFavorites(image: UnsplashPhoto) {
    if (!isFavorite(image.id)) {
      addDocumentToFavorites("favorites", image.id, image);
    } else {
      deleteDocumentFromFavorites("favorites", image.id);
    }
  }

  // =========================================================================

  // Downloads List
  const { data: downloadsList } = useCollection("downloads");

  // Check if image is in downloads
  const isInDownloads = (imageId: string) =>
    downloadsList.some((item) => item.id === imageId);

  const { addDocumentToDownloads, deleteDocumentFromDownloads } =
  useFirestore();

  // Handle Add/Remove from Downloads
  function handleAddToDownloads(image: UnsplashPhoto) {
    if (!isInDownloads(image.id)) {
      addDocumentToDownloads("downloads", image.id, image);
    } else {
      deleteDocumentFromDownloads("downloads", image.id);
    }
  }

  return (
    <div className="w-full" onClick={() => dispatch(closeCollectionModal())}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 500: 1, 640: 2, 750: 3, 1024: 4 }}
      >
        <Masonry gutter="10px">
          {images.length ? (
            images.map((image) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                key={image.id}
                className="group relative text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(closeWindow());
                }}
              >
                <div className="duraction-300 invisible absolute top-0 left-0 flex w-full items-center justify-between px-3 py-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <span>{image.promoted_at && "Promoted"}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleAddToFavorites(image)}
                      className={`cursor-pointer rounded-lg border border-gray-300 px-[12px] py-2 text-sm opacity-50 shadow-sm transition duration-100 hover:border-gray-400 hover:opacity-65 ${
                        isFavorite(image.id)
                          ? "bg-red-500 text-white"
                          : "bg-white text-black"
                      } `}
                      title="Like this image"
                    >
                      <FaHeart />
                    </button>
                    <button
                      onClick={() => dispatch(openCollectionModal(image))}
                      className="cursor-pointer rounded-lg border border-gray-300 bg-white px-[12px] py-2 text-sm text-black opacity-50 shadow-sm transition duration-300 hover:border-gray-400 hover:opacity-65"
                      title="Add to a collection"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <img
                  key={image.id}
                  src={image.urls.regular}
                  alt={image.alt_description || "Just an image"}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "5px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(openImageModal(image))}
                />
                <div className="duraction-300 invisible absolute bottom-0 flex w-full items-center justify-between px-2 py-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-[40px] w-[40px] shrink-0 rounded-full"
                      src={
                        image.user?.profile_image?.small ??
                        "/default-avatar.png"
                      }
                      alt={
                        image.user.name
                          ? image.user.name + " avatar"
                          : "No description available"
                      }
                    />
                    <div className="flex flex-col items-start justify-between text-[12px]">
                      {image.user.name ?? "Uknown"}
                      <p>
                        {image.user.for_hire
                          ? "Available for hire"
                          : "For Unsplash+"}
                      </p>
                    </div>
                  </div>
                  <span
                    className="cursor-pointer rounded-lg border border-gray-300 bg-white px-[12px] py-2 text-sm text-black opacity-50 shadow-sm transition duration-300 hover:border-gray-400 hover:opacity-65"
                    title="Add to downloads"
                  >
                    <a
                      onClick={() => handleAddToDownloads(image)}
                      download
                      href={image.links.download + "&force=true"}
                    >
                      <HiArrowNarrowDown />
                    </a>
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div></div>
          )}
        </Masonry>
      </ResponsiveMasonry>

      {/* Image Modal */}
      {imageModal.isOpen && imageModal.imageData && <ImageModal />}

      {/* Collection Modal */}
      {collectionModal.isOpen && collectionModal.imageData && (
        <CollectionModal />
      )}
    </div>
  );
};

export default React.memo(ImageLayout);
