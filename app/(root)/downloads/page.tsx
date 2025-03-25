"use client";

import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

// Components
import DownloadsList from "@/app/components/DownloadsList";

const Downlaods = () => {
  const downloadsList = useSelector(
    (state: RootState) => state.downloads.downloadsList
  );

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div className="container max-w-6xl mx-auto mt-24 min-h-screen">
      <h2 className={`text-2xl font-extrabold ${darkMode ? "text-black" : "text-white"}`}>Downloads List</h2>
      {downloadsList.length > 0 ? (
        <DownloadsList images={downloadsList} />
      ) : (
        "No downloads yet."
      )}
    </div>
  );
};

export default Downlaods;
