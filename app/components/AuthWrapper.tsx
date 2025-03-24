"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProtectedRoutes from "./ProtectedRoutes";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated,
  );

  return <ProtectedRoutes user={isAuthenticated}>{children}</ProtectedRoutes>;
};

export default AuthWrapper;
