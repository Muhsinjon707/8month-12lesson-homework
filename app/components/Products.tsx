"use client";

import React, { useEffect, useState, useRef } from "react";
import ImageLayout from "./ImageLayout";
import useFetch from "../hooks/useFetch";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

// Lodash debounce
import { useDebounce } from "use-debounce";

// interface
import { UnsplashPhoto } from "../model/UnspashPhoto";

// Redux actions
import { closeWindow } from "../store/slice/burgerMenuSlice";
import { closeCollectionModal } from "../store/slice/modalSlice";

interface UnsplashResponse {
  results: UnsplashPhoto[];
}

const ACCESS_KEY: string | undefined = process.env.NEXT_PUBLIC_ACCESS_KEY;

const Products = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const [filteredImages, setFilteredImages] = useState<UnsplashPhoto[]>([]);
  const [pageParam, setPageParam] = useState(1);

  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery,
  );
  const prevSearchParams = useRef(searchQuery);

  const [debouncedQuery] = useDebounce(searchQuery, 500);

  if (!ACCESS_KEY) {
    return <p className="text-red-500">API key is missing</p>;
  }

  const { data, isPending, isError } = useFetch<UnsplashResponse>(
    `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${
      debouncedQuery || "all"
    }&page=${pageParam}&per_page=20`,
  );

  useEffect(() => {
    if (data?.results) {
      setFilteredImages((prev) => {
        const newImages =
          pageParam === 1 ? data.results : [...prev, ...data.results];

        return Array.from(new Set(newImages.map((img) => img.id))).map(
          (id) => newImages.find((img) => img.id === id)!,
        );
      });
    }
  }, [data]);

  useEffect(() => {
    if (debouncedQuery !== prevSearchParams.current) {
      setFilteredImages([]);
      setPageParam(1);
      prevSearchParams.current = debouncedQuery;
    }
  }, [debouncedQuery]);

  const dispatch = useDispatch()

  return (
    <div
      onClick={() => {
        dispatch(closeWindow());
        dispatch(closeCollectionModal());
      }}
      className="mt-24 flex flex-col items-center"
    >
      {isPending && <div>Loading...</div>}
      {isError && (
        <p className="text-red-500">
          Failed to fetch images. Please try again later.
        </p>
      )}
      {filteredImages.length > 0 ? (
        <ImageLayout images={filteredImages} />
      ) : (
        !isPending && <p>No images found for "{debouncedQuery}"</p>
      )}

      {!isPending && (
        <button
          onClick={() => setPageParam(pageParam + 1)}
          className={`my-5 rounded-lg border border-gray-300 px-4 py-2 shadow-md transition duration-200 hover:border-gray-500 hover:bg-gray-200 ${darkMode ? "bg-violet-200 text-gray-800" : "bg-blue-500 text-white"} `}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default Products;
