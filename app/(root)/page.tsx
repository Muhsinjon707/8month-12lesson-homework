"use client";

import React, { useState } from "react";

// components
import Header from "../components/Header";
import Products from "../components/Products";

const Home = () => {

  return (
    <div className="container mx-auto mt-5 min-h-screen">
      <Products />
    </div>
  );
};

export default Home;
