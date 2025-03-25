"use client";

// React
import React, { useEffect, useState } from "react";

// React icons
import { IoIosArrowForward } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux store
import { RootState } from "@/app/store/store";

// Redux Darkmode slice actions
import { setDarkMode, setLightMode } from "@/app/store/slice/darkModeSlice";

// Auth
import { logoutUser, setAuthReady } from "@/app/store/slice/loginSlice";

// firebase
import { auth } from "@/app/firebase/firebaseConfig";
import { signOut } from "firebase/auth";

// Toastify
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.user);

  const [doUpdateProfile, setUpdateProfile] = useState(false);

  const [profileEmail, setProfileEmail] = useState<string>(user?.email || "");
  const [profileName, setProfileName] = useState<string>(
    user?.displayName || "",
  );

  useEffect(() => {
    if (doUpdateProfile) {
      setProfileEmail(user?.email || "");
      setProfileName(user?.displayName || "");
    }
  }, [doUpdateProfile, user]);

  async function signOutUser() {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      dispatch(setAuthReady());
      toast.success("Successfully signed out!");
    } catch (error: any) {
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Couldn't resolve while signing out");
      }
    }
  }

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div
      className={`min-h-screen w-full ${darkMode ? "bg-[#292b30]" : "bg-[#05768e]"} pt-10`}
    >
      <div className="absolute top-1/2 left-1/2 container flex max-w-4xl -translate-1/2 items-center justify-center">
        <div className="flex w-full items-start justify-between gap-16">
          <div className="flex flex-col items-start gap-20">
            <div className="h-[330px] w-[308px] rounded-xl bg-white px-3 py-4">
              <div className="flex items-center justify-center gap-4 border-b border-gray-400 pb-4">
                <img
                  src={
                    user?.photoURL ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${user?.displayName}`
                  }
                  alt={user?.displayName || "User Avatar"}
                  className="hidden h-14 w-14 rounded-full border-2 border-gray-200 shadow-md transition-all duration-300 hover:scale-105 xl:block"
                />
                <div>
                  <h3 className="text-lg">{user?.displayName}</h3>
                  <p className="text-md w-40 truncate text-[#6B7280]">
                    {user?.email}
                  </p>
                </div>
              </div>
              <ul className="mt-4">
                <li className="flex w-full items-center justify-between rounded-md p-3 text-black hover:bg-gray-300">
                  <div className="flex items-center gap-2">
                    <span>
                      <FiUser />
                    </span>
                    <h4>My Profile</h4>
                  </div>
                  <IoIosArrowForward />
                </li>
                <li className="flex w-full items-center justify-between rounded-md p-3 text-black hover:bg-gray-300">
                  <div className="flex items-center gap-2">
                    <span>
                      <IoSettingsOutline />
                    </span>
                    <h4>Settings</h4>
                  </div>
                  <IoIosArrowForward />
                </li>
                <li
                  onClick={signOutUser}
                  className="flex w-full items-center justify-between rounded-md p-3 text-black hover:bg-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <span>
                      <IoMdLogOut />
                    </span>
                    <h4>Log out</h4>
                  </div>
                  <IoIosArrowForward />
                </li>
              </ul>
            </div>
            <div className="h-[150px] w-[308px] rounded-xl bg-white px-6 py-5">
              <div className="flex w-full items-center justify-between border-b border-gray-200 pb-4">
                <h4>Settings</h4>
                <span>
                  <IoMdClose />
                </span>
              </div>
              <ul className="flex flex-col items-start justify-between">
                <li className="flex w-full items-center justify-between rounded-md py-2 hover:bg-gray-300">
                  <h4>Theme</h4>
                  <div className="flex items-center gap-2">
                    <h4>{darkMode ? "Dark" : "Light"}</h4>
                    <div className="group relative">
                      <span>
                        <IoIosArrowDown />
                      </span>
                      <ul className="backdrop-blue-lg invisible absolute top-5 right-0 h-20 w-20 flex-col overflow-hidden rounded-md bg-white/50 opacity-0 shadow transition-all delay-200 duration-300 ease-linear group-hover:visible group-hover:opacity-100">
                        <li
                          onClick={() => dispatch(setLightMode())}
                          className="px-3 py-2 hover:bg-gray-200"
                        >
                          Light
                        </li>
                        <li
                          onClick={() => dispatch(setDarkMode())}
                          className="px-3 py-2 hover:bg-gray-200"
                        >
                          Dark
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="flex w-full items-center justify-between rounded-md py-2 hover:bg-gray-300">
                  <h4>Language</h4>
                  <div className="flex items-center gap-2">
                    <h4>Eng</h4>
                    <div className="group relative">
                      <span>
                        <IoIosArrowDown />
                      </span>
                      <ul className="invisible absolute top-5 right-0 h-30 w-30 flex-col overflow-hidden rounded-md bg-white opacity-0 shadow transition-all delay-200 duration-300 ease-linear group-hover:visible group-hover:opacity-100">
                        <li className="px-3 py-2 hover:bg-gray-200">Eng</li>
                        <li className="px-3 py-2 hover:bg-gray-200">Rus</li>
                        <li className="px-3 py-2 hover:bg-gray-200">Uzb</li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex h-[516px] w-[550px] flex-col items-start justify-between rounded-xl bg-white p-10">
            <div className="w-full">
              <div className="flex h-20 w-full items-start justify-between border-b border-gray-200">
                <div className="flex items-center justify-center gap-4">
                  <div className="relative">
                    <img
                      src={
                        user?.photoURL ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${user?.displayName}`
                      }
                      alt={user?.displayName || "User Avatar"}
                      className="hidden h-16 w-16 rounded-full border-2 border-gray-300 shadow-md transition-all duration-300 hover:scale-105 xl:block"
                    />
                    {doUpdateProfile && (
                      <span
                        title="Change profile settings"
                        className="absolute right-0 bottom-0 rounded-full bg-white p-1 shadow"
                      >
                        <LuPenLine />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="">{user?.displayName}</h3>
                    <p className="w-40 text-[#6B7280]">{user?.email}</p>
                  </div>
                </div>
                <div>
                  <span className="text-xl">
                    <IoMdClose />
                  </span>
                </div>
              </div>
              <ul>
                <li className="flex w-full items-center justify-between border-b border-gray-200 py-6">
                  <h3 className="text-[#1F2937]">Name</h3>
                  <input
                    readOnly={!doUpdateProfile}
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className={`text-md w-2/3 text-[#4B5563] ${doUpdateProfile ? "border" : "border-none"} px-3 py-2 text-end outline-none`}
                  />
                </li>
                <li className="flex w-full items-center justify-between border-b border-gray-200 py-6">
                  <h3 className="text-[#1F2937]">Email account</h3>
                  <input
                    readOnly={!doUpdateProfile}
                    type="text"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className={`text-md w-2/3 text-[#4B5563] ${doUpdateProfile ? "border" : "border-none"} px-3 py-2 text-end outline-none`}
                  />
                </li>
                <li className="flex w-full items-center justify-between border-b border-gray-200 py-6">
                  <h3 className="text-[#1F2937]">Mobile number</h3>
                  <h3 className="text-md text-[#4B5563]">Not available yet.</h3>
                </li>
                <li className="flex w-full items-center justify-between py-6">
                  <h3 className="text-[#1F2937]">Location</h3>
                  <h3 className="text-md text-[#4B5563]">Not available yet.</h3>
                </li>
              </ul>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <button
                onClick={() => setUpdateProfile(!doUpdateProfile)}
                className="grow rounded-md bg-blue-500 px-5 py-2 font-bold text-white"
              >
                {doUpdateProfile ? "Save changes" : "Update Profile"}
              </button>
              <button className="grow rounded-md bg-red-500 px-5 py-2 font-bold text-white">
                Home page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
