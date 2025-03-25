"use client";

// Next
import Image from "next/image";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

// Components
import Signup from "@/app/components/Signup";

const Register = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  return (
    <div
      className={` ${
        darkMode ? "bg-[#5c566d]" : "border-2 bg-white"
      } font-mono-sans flex h-screen w-full items-center justify-center`}
    >
      <div
        className={`absolute top-1/2 left-1/2 flex h-[70%] w-[65%] -translate-1/2 items-center justify-center gap-0 overflow-y-hidden rounded-2xl shadow-xl lg:gap-8 xl:justify-between ${darkMode ? "bg-[#2c2638]" : "bg-white"} `}
      >
        <div>
          <Image
            className="h-full w-[550px] rounded-2xl hidden xl:inline-block"
            src={`/${darkMode ? "black" : "dark-blue"}-texture-medium.jpg`}
            alt="Black Texture"
            width={500}
            height={80}
          />
        </div>
        <div className="flex w-[500px] flex-col items-start justify-center gap-4 px-10 text-white xl:w-1/2">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default Register;
