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

interface UnsplashResponse {
  results: UnsplashPhoto[];
}

const ACCESS_KEY: string | undefined = process.env.NEXT_PUBLIC_ACCESS_KEY;

const Products = () => {
  const [filteredImages, setFilteredImages] = useState<UnsplashPhoto[]>([]);
  const [pageParam, setPageParam] = useState(1);

  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );
  const prevSearchParams = useRef(searchQuery);

  const [debouncedQuery] = useDebounce(searchQuery, 500);

  if (!ACCESS_KEY) {
    return <p className="text-red-500">API key is missing</p>;
  }

  const { data, isPending, isError } = useFetch<UnsplashResponse>(
    `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${
      debouncedQuery || "all"
    }&page=${pageParam}&per_page=20`
  );

  useEffect(() => {
    if (data?.results) {
      setFilteredImages((prev) => {
        const newImages =
          pageParam === 1 ? data.results : [...prev, ...data.results];

        return Array.from(new Set(newImages.map((img) => img.id))).map(
          (id) => newImages.find((img) => img.id === id)!
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

  return (
    <div className="mt-24 flex flex-col items-center">
      {isPending && <p>Loading...</p>}
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
          className="
            bg-violet-200 text-gray-800 border border-gray-300 
            hover:bg-gray-200 hover:border-gray-500 transition duration-200
            shadow-md rounded-lg py-2 px-4 my-5
          "
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default Products;
