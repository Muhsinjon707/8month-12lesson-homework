"use client";

import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

// Components
import DownloadsList from "@/app/components/DownloadsList";
import { useCollection } from "@/app/hooks/useCollection";

const Downlaods = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div className="container mx-auto mt-24 min-h-screen max-w-6xl">
      <h2
        className={`text-2xl font-extrabold ${darkMode ? "text-black" : "text-white"}`}
      >
        Downloads List
      </h2>
      <DownloadsList />
    </div>
  );
};

export default Downlaods;
