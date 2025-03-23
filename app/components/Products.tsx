"use client";

import React, { useEffect, useState, useRef } from "react";
import ImageLayout from "./ImageLayout";
import useFetch from "../hooks/useFetch";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";

// interface
type User = {
  name: string;
  username: string;
  profile_image: { small: string };
  bio?: string;
};

interface UnsplashPhoto {
  id: string;
  promoted_at: string;
  urls: { regular: string };
  alt_description: string;
  user: User;
  links: { download: string };
  created_at?: string;
  updated_at?: string;
  likes?: number;
  description?: string;
  width?: number;
}

interface UnsplashResponse {
  results: UnsplashPhoto[];
}

interface ProductProps {
  searchQuery: string;
}

const ACCESS_KEY: string | undefined = process.env.NEXT_PUBLIC_ACCESS_KEY;

const Products = ({ searchQuery }: ProductProps) => {
  const [filteredImages, setFilteredImages] = useState<UnsplashPhoto[]>([]);
  const [pageParam, setPageParam] = useState(1);

  const prevSearchParams = useRef(searchQuery);

  if (!ACCESS_KEY) {
    if (process.env.NODE_ENV === "development") {
      throw new Error("Unsplash API Access Key is missing!");
    }
    return <p className="text-red-500">API key is missing</p>;
  }

  const { data, isPending, isError } = useFetch<UnsplashResponse>(
    `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${
      searchQuery || "all"
    }&page=${pageParam}&per_page=20`
  );

  useEffect(() => {
    if (data && data.results) {
      setFilteredImages((prev) => {
        return pageParam === 1 ? data.results : [...prev, ...data.results];
      });
    }
  }, [data]);

  useEffect(() => {
    if (searchQuery !== prevSearchParams.current) {
      setFilteredImages([]);
      setPageParam(1);
      prevSearchParams.current = searchQuery;
    }
  }, [searchQuery]);

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
        !isPending && <p>No images found for "{searchQuery}"</p>
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
