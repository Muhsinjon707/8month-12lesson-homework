"use client";

// Next
import Image from "next/image";

// Components
import Signin from "@/app/components/Signin";

// Redux
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

const Login = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div
      className={` ${
        darkMode ? "bg-[#5c566d]" : "border-2 bg-white"
      } font-mono-sans flex h-screen w-full items-center justify-center`}
    >
      <div
        className={`absolute top-1/2 left-1/2 flex h-[650px] w-[1000px] -translate-1/2 items-center justify-between gap-8 overflow-y-hidden rounded-2xl p-4 shadow-xl ${darkMode ? "bg-[#2c2638]" : "bg-white"} `}
      >
        <div>
          <Image
            className="h-[620px] w-[500px] rounded-2xl"
            src={`/${darkMode ? "black" : "blue"}-texture-medium.jpg`}
            alt="Black Texture"
            width={500}
            height={80}
          />
        </div>
        <div className="flex w-1/2 flex-col items-start justify-center gap-4 px-10 text-white">
          <Signin />
        </div>
      </div>
    </div>
  );
};

export default Login;
