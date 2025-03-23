"use client";

// React
import React, { useState } from "react";

// Next
import Image from "next/image";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux store
import { RootState } from "../store/store";

// Redux Modal actions
import { closeCollectionModal } from "../store/slice/modalSlice";

// Interfaces && Types
import { UnsplashPhoto } from "../model/UnspashPhoto";

// Modal Componenets in Collection Folder (Right & Left)
import ModalLeft from "./Collection/ModalLeft";
import ModalRight from "./Collection/ModalRight";

// Addition libraries
import { motion } from "framer-motion";

const CollectionModal: React.FC = () => {
  const dispatch = useDispatch();

  // Modal States
  const { isOpen, imageData } = useSelector(
    (state: RootState) => state.modal.collectionModal
  );

  const [showRightModal, setShowRightModal] = useState(false);

  if (!isOpen || !imageData) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-grayscale-50 flex justify-center items-center z-50"
    >
      <button
        className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
        onClick={() => {
          dispatch(closeCollectionModal());
          setShowRightModal(false);
        }}
        title="Close the Collections modal"
      >
        ✕
      </button>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="
          relative bg-white w-[55%] min-h-[65%] rounded-lg shadow-lg max-w-7xl 
          flex items-start justify-start gap-3 overflow-hidden 
        "
      >
        <motion.div
          initial={{x: -30, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{delay: 0.2, duration: 0.3}}
          className="w-[40%] bg-[#fdfdc6] p-6 rounded-l-lg h-full">
          <Image
            className="w-[500px] h-[500px] object-cover"
            src="/collection-image-removebg-preview.png"
            width={600}
            height={100}
            alt="Collection cabbage background image"
          />
        </motion.div>
        {!showRightModal ? (
          <ModalLeft
            imageData={imageData}
            onCreateNewCollection={() => setShowRightModal(true)}
          />
        ) : (
          <ModalRight
            imageData={imageData}
            setShowRightModal={setShowRightModal}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default CollectionModal;
