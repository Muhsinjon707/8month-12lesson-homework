"use client";

// react
import React, { useEffect, useState } from "react";

// next links
import Link from "next/link";
import Image from "next/image";

// components
import CustomInput from "./CustomSearch";

// react-icons
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { BsFillCollectionFill } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import { HiMiniPhoto } from "react-icons/hi2";

// Dark/Light Mode icons
import { WiMoonAltWaningCrescent5 } from "react-icons/wi";
import { WiMoonAltWaningGibbous2 } from "react-icons/wi";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux | DarkModaSlice actions
import { toggleDarkMode } from "../store/slice/darkModeSlice";

// Redux store config..
import { RootState } from "../store/store";

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  console.log("Darkmode: ", darkMode);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.login.user);
  console.log(user);

  return (
    <header
      className={` ${darkMode == "dark" ? "bg-[#292434] text-white" : "bg-white text-black"} fixed top-0 right-0 left-0 z-50 mx-auto px-16 py-3 shadow-lg`}
    >
      <nav className="xs:gap-10 xs:flex-row flex w-full flex-col items-center justify-between gap-2 sm:flex-col sm:gap-3 md:gap-4 xl:flex-row">
        <Link
          href="/"
          title="My website"
          className="flex w-1/3 items-center gap-2 self-start sm:self-center lg:justify-start"
        >
          <Image
            className="h-auto w-auto rounded-md"
            src="/unsplash-logo.jpg"
            alt="Unsplash Logo"
            width={40}
            height={30}
          />
          <span className="flex items-center space-x-8 text-3xl font-extrabold">
            Muhsinjon.
          </span>
        </Link>
        <div className="flex w-2/3 items-center justify-center gap-8 xl:justify-between xl:gap-5">
          <div className="self-center">
            <CustomInput
              type="text"
              placeholder="Search images..."
              name="search"
            />
          </div>
          <div className="flex items-center gap-5">
            <div
              onClick={() => dispatch(toggleDarkMode())}
              title={`The current mode is: ${darkMode}`}
              className="scale-200 cursor-pointer"
            >
              {darkMode === "dark" ? (
                <WiMoonAltWaningGibbous2 />
              ) : (
                <WiMoonAltWaningCrescent5 />
              )}
            </div>
            <div
              onClick={() => setOpen(true)}
              className="mx-2 scale-200 cursor-pointer"
            >
              {!isOpen && <GiHamburgerMenu />}
            </div>
            <div className="group relative flex items-center">
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt={user?.displayName || "User Avatar"}
                className="h-14 w-14 rounded-full border-2 border-gray-300 shadow-md transition-all duration-300 hover:scale-105"
              />

              <div className="absolute top-16 right-0 hidden w-74 flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-xl group-hover:flex dark:border-gray-700 dark:bg-gray-900">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                  Name:{" "}
                  <span className="font-normal">
                    {user?.displayName || "Guest"}
                  </span>
                </h4>
                <h3 className="text-sm text-gray-600 dark:text-gray-400">
                  Email:{" "}
                  <span className="font-normal">{user?.email || "N/A"}</span>
                </h3>
              </div>
            </div>

            <ul
              className={` ${
                isOpen
                  ? "visible bg-white/30 opacity-100 backdrop-blur-md"
                  : "invisible opacity-0"
              } absolute top-0 right-0 flex min-h-screen w-[350px] flex-col items-start gap-3 rounded-l-xl p-6 shadow-lg transition-all duration-300 ease-in-out`}
            >
              <div className="absolute top-4 right-4 scale-180 cursor-pointer">
                <MdOutlinePlaylistRemove onClick={() => setOpen(false)} />
              </div>
              <li className="mt-10 w-full">
                <Link
                  href="/"
                  className="flex w-full items-center justify-between rounded-lg bg-white p-3 text-lg font-medium text-black transition-all duration-200 hover:bg-gray-300 hover:text-white"
                >
                  Photos
                  <span>
                    <HiMiniPhoto />
                  </span>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/collections"
                  className="flex w-full items-center justify-between rounded-lg bg-white p-3 text-lg font-medium text-black transition-all duration-200 hover:bg-gray-300 hover:text-white"
                >
                  Collections
                  <span>
                    <BsFillCollectionFill />
                  </span>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/downloads"
                  className="flex w-full items-center justify-between rounded-lg bg-white p-3 text-lg font-medium text-black transition-all duration-200 hover:bg-gray-300 hover:text-white"
                >
                  Downloads
                  <span>
                    <FaDownload />
                  </span>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/login"
                  className="flex w-full items-center justify-between rounded-lg bg-white p-3 text-lg font-medium text-black transition-all duration-200 hover:bg-gray-300 hover:text-white"
                >
                  Login
                  <span>
                    <LuLogIn />
                  </span>
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
