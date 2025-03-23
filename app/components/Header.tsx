"use client";

// react
import React, { useState } from "react";

// next links
import Link from "next/link";
import Image from "next/image";

// components
import CustomInput from "./CustomSearch";

// react-icons
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlinePlaylistRemove } from "react-icons/md";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-auto text-black py-3 px-16 shadow-lg bg-[#292434]">
      <nav
        className="
          flex w-full justify-between items-center 
          gap-2 xs:gap-10 sm:gap-3 md:gap-4
          flex-col xs:flex-row sm:flex-col xl:flex-row
        "
      >
        <Link
          href="/"
          title="My website"
          className="w-1/3 flex items-center self-start sm:self-center lg:justify-start gap-2"
        >
          <Image
            className="w-auto h-auto rounded-md"
            src="/unsplash-logo.jpg"
            alt="Unsplash Logo"
            width={40}
            height={30}
          />
          <span className="flex items-center space-x-8  font-extrabold text-3xl text-white">
            Muhsinjon.
          </span>
        </Link>
        <div
          className=" 
            w-2/3 flex items-center 
            justify-center xl:justify-between 
            gap-8 xl:gap-0
          "
        >
          <div className="self-center">
            <CustomInput
              type="text"
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search images..."
              name="search"
            />
          </div>
          <div className="flex items-center">
            <ul
              className="
                hidden lg:flex items-center space-x-8 font-extralight text-white
              "
            >
              <li>
                <Link href="/">Photos</Link>
              </li>
              <li className="flex items-center gap-4">
                <Link href="/login">Login</Link>
              </li>
              <li className="flex items-center gap-4">
                <Link href="/register">Register</Link>
              </li>
            </ul>
            <div className="scale-200 lg:hidden">
              <GiHamburgerMenu onClick={() => setOpen(true)} />
            </div>
            <ul
              className={`
                  ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                  absolute top-0 right-0 min-h-screen w-[350px] bg-white shadow-lg rounded-l-xl
                  flex flex-col items-start gap-3 p-6 transition-all duration-300 ease-in-out  
              `}
            >
              <div className="absolute top-4 right-4 scale-180 cursor-pointer">
                <MdOutlinePlaylistRemove onClick={() => setOpen(false)} />
              </div>
              <li className="w-full">
                <Link
                  href="/"
                  className="block w-full p-3 text-lg font-medium text-black transition-all duration-200 
                 bg-white hover:bg-gray-300 hover:text-white rounded-lg"
                >
                  Photos
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/login"
                  className="block w-full p-3 text-lg font-medium text-black transition-all duration-200 
                 bg-white hover:bg-gray-300 hover:text-white rounded-lg"
                >
                  Login
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/register"
                  className="block w-full p-3 text-lg font-medium text-black transition-all duration-200 
                 bg-white hover:bg-gray-300 hover:text-white rounded-lg"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
