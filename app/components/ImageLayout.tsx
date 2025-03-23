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
  addToFavorites,
  removeFromFavorites,
} from "../store/slice/favoritesSlice";
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

interface ImageLayoutProps {
  images: UnsplashPhoto[];
}

const ImageLayout: React.FC<ImageLayoutProps> = ({ images }) => {
  const dispatch = useDispatch();

  // Modals configs.
  const { imageModal, collectionModal } = useSelector(
    (state: RootState) => state.modal
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

  return (
    <div className="w-full">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 500: 1, 640: 2, 750: 3, 1024: 4 }}
      >
        <Masonry gutter="10px">
          {images.length ? (
            images.map((image) => (
              <div key={image.id} className="relative group text-white">
                <div
                  className="
                    invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duraction-300
                    absolute top-0 left-0 px-3 py-2 w-full flex items-center justify-between
                   "
                >
                  <span>{image.promoted_at && "Promoted"}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleAddToFavorites(image)}
                      className={` 
                        border border-gray-300 cursor-pointer py-2 px-[12px] rounded-lg shadow-sm text-sm 
                        hover:border-gray-400 transition duration-100 opacity-50 hover:opacity-65 
                        ${
                          isFavorite(image.id)
                            ? "bg-red-500 text-white"
                            : "bg-white text-black"
                        }  
                      `}
                      title="Like this image"
                    >
                      <FaHeart />
                    </button>
                    <button
                      onClick={() => dispatch(openCollectionModal(image))}
                      className="
                        bg-white border border-gray-300 cursor-pointer py-2 px-[12px] rounded-lg shadow-sm
                        hover:border-gray-400 transition duration-300 opacity-50 hover:opacity-65 text-black 
                        text-sm
                      "
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
                <div
                  className="
                      invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duraction-300
                      w-full absolute px-2 py-2 bottom-0 flex items-center justify-between
                    "
                >
                  <div className="flex gap-2 items-center">
                    <img
                      className="rounded-full w-[40px] h-[40px] shrink-0"
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
                    className="
                        bg-white border border-gray-300 cursor-pointer py-2 px-[12px] rounded-lg shadow-sm
                        hover:border-gray-400 transition duration-300 opacity-50 hover:opacity-65 text-black 
                        text-sm
                      "
                    title="Add to a collection"
                  >
                    <a download href={image.links.download + "&force=true"}>
                      <HiArrowNarrowDown />
                    </a>
                  </span>
                </div>
              </div>
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
