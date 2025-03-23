"use client";

import React, { useState } from "react";

// components
import Header from "../components/Header";
import Products from "../components/Products";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto mt-5 min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Products searchQuery={searchQuery}/>
    </div>
  );
};

export default Home;
