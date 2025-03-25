"use client";

// React
import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux store config.
import { RootState } from "@/app/store/store";

// Components
import FavoritesLayout from "@/app/components/FavoritesLayout";

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.liked.likedImages);

  return (
    <div className="min-h-screen mt-30 container mx-auto">{favorites.length > 0 && <FavoritesLayout images={favorites} />}</div>
  );
};

export default Favorites;
