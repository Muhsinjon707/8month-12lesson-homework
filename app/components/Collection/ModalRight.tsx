"use client";

import React, { useState, SetStateAction } from "react";

// Redux | Collection actions and others...
import { createCollection } from "@/app/store/slice/collectionsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";

// React icons
import { FaLock } from "react-icons/fa";

// Interface
import { UnsplashPhoto } from "@/app/model/UnspashPhoto";

interface ModalRightProps {
  imageData: UnsplashPhoto;
  setShowRightModal: (show: boolean) => void;
}

const ModalRight: React.FC<ModalRightProps> = ({ imageData, setShowRightModal }) => {
  // New collection data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(false);

  const maxLength = 60;
  const descriptionMaxLength = 250;

  // New collection configuration
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Collection name cannot be empty!");
      return;
    }

    const newCollection = {
      id: new Date().toISOString(),
      name,
      description,
      type,
      images: [imageData],
    };

    dispatch(createCollection(newCollection));
    setName("");
    setDescription("");
    setType(false);
    setShowRightModal(false);
  }

  return (
    <div className="w-[60%] px-2 pr-4 py-7">
      <h2 className="font-bold text-2xl">Create new collection</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-8 flex flex-col items-start gap-6"
      >
        <div className="flex flex-col gap-1 w-full max-w-md">
          <label className="font-medium">Name</label>
          <div className="relative w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={maxLength}
              placeholder="Beautiful photos"
              style={{ color: "black" }}
              className="
                w-full border border-gray-300 rounded-md px-3 py-2 
                focus:ring-2 focus:ring-black focus:outline-none
              "
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {maxLength - name.length}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full max-w-md">
          <label className="text-black font-medium">
            Description <span className="text-gray-500">(optional)</span>
          </label>
          <div className="relative w-full">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={descriptionMaxLength}
              placeholder="Enter a description..."
              className="
                w-full text-black border border-gray-300 rounded-md px-3 py-2 
                focus:ring-2 focus:ring-black focus:outline-none h-24 resize-none
              "
            />
            <span className="absolute right-3 bottom-3 text-gray-400 text-sm">
              {descriptionMaxLength - description.length}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-md">
          <input
            type="checkbox"
            checked={type}
            onChange={(e) => setType(e.target.checked)}
          />
          <p className="flex items-center gap-2">
            Make collection private{" "}
            <span className="scale-75">
              <FaLock />
            </span>
          </p>
        </div>
        <div className="w-full flex items-center justify-between">
          <button onClick={() => setShowRightModal(false)} type="reset" className="cursor-pointer text-sm text-gray-500">
            Cancel
          </button>
          <button type="submit" className="cursor-pointer px-3 py-3 text-sm text-white bg-black rounded-md font-semibold">
            Create collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalRight;
