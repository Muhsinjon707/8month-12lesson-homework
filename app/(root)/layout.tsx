"use client";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import Header from "../components/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <main className={`w-full ${darkMode == "dark" ? "bg-[#5c566d]" : "bg-white"}`}>
      <Header />
      {children}
    </main>
  );
}
