"use client";

import React from "react";

// components
import Products from "../components/Products";

// Redux 
import { useDispatch } from "react-redux";
import { closeWindow } from "../store/slice/burgerMenuSlice";

const Home = () => {

  const dispatch = useDispatch()

  return (
    <div onClick={() => dispatch(closeWindow())} className="container mx-auto mt-5 min-h-screen">
      <Products />
    </div>
  );
};

export default Home;
