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
    (state: RootState) => state.search.searchQuery
  );

  return (
    <label
      className="
      xs:w-[320px] sm:w-[500px]
      bg-[#3b334d] flex items-center rounded-lg text-white 
      shadow-xl px-3 py-3 sm:mb-2 md:mb-0
    "
    >
      <svg
        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
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
        className="w-full ml-2 sm:ml-3 text-xs sm:text-sm md:text-base focus:outline-none"
      />

      {searchQuery && (
        <button
          onClick={() => dispatch(setSearchQuery(""))}
          className="text-gray-500 hover:text-black ml-2 sm:ml-3 cursor-pointer"
        >
          ✖
        </button>
      )}
    </label>
  );
};

export default CustomInput;
