"use client";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

import Header from "../components/Header";
import { closeWindow } from "../store/slice/burgerMenuSlice";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const dispatch = useDispatch();

  return (
    <main
      onClick={() => dispatch(closeWindow())}
      className={`w-full ${darkMode ? "bg-[#5c566d]" : "bg-white"}`}
    >
      <Header />
      {children}
    </main>
  );
}
