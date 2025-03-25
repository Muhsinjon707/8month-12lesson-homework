"use client";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux slice action
import { setSearchQuery } from "../store/slice/searchSlice";
import { RootState } from "../store/store";

interface InputTypes {
  type: string;
  placeholder: string;
  name: string;
}

const CustomInput = ({ type, placeholder, name }: InputTypes) => {
  const dispatch = useDispatch();

  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery,
  );

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <label
      className={`xs:w-[320px] flex items-center rounded-lg px-3 py-3 sm:mb-2 sm:w-[500px] md:mb-0 ${
        darkMode
          ? "bg-[#3b334d] text-white shadow-xl"
          : "bg-white text-black shadow"
      } `}
    >
      <svg
        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke={`${darkMode ? "white" : "black"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
        />
      </svg>

      <input
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        type={type}
        placeholder={placeholder}
        name={name}
        className={`ml-2 w-full text-xs focus:outline-none sm:ml-3 sm:text-sm md:text-base placeholder:${darkMode ? "text-white" : "text-black"}`}
        style={{ color: darkMode ? "white" : "black" }}
      />

      {searchQuery && (
        <button
          onClick={() => dispatch(setSearchQuery(""))}
          className="ml-2 cursor-pointer text-gray-500 hover:text-black sm:ml-3"
        >
          ✖
        </button>
      )}
    </label>
  );
};

export default CustomInput;
