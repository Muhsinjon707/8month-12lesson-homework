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
      className={`
      ${
        darkMode == "dark" ? "bg-[#5c566d]" : "bg-white border-2"
      } w-full h-screen font-mono-sans flex justify-center items-center
      `}
    >
      <div
        className={`
          w-[1000px] h-[650px] absolute top-1/2 left-1/2 -translate-1/2 overflow-y-hidden 
          flex justify-between gap-8 p-4 rounded-2xl items-center shadow-xl
          ${darkMode == "dark" ? "bg-[#2c2638]" : "bg-white"} 
        `}
      >
        <div>
          <Image
            className="w-[500px] h-[620px] rounded-2xl"
            src={`/${darkMode == "dark" ? "black" : "dark-blue"}-texture-medium.jpg`}
            alt="Black Texture"
            width={500}
            height={80}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4 justify-center items-start text-white px-10">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default Register;
