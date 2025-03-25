"use client";

// React
import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

// Slice
import { loginUser, setAuthReady } from "../store/slice/loginSlice";

// Protected Routes scheme
import ProtectedRoutes from "./ProtectedRoutes";

// Firebase sttings.
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const authReady = useSelector((state: RootState) => state.login.authReady);

  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated,
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(
        loginUser({
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          emailVerified: user?.emailVerified,
        }),
      );
      dispatch(setAuthReady());
    });
  }, [dispatch]);
  return (
    <>
      {authReady && (
        <ProtectedRoutes user={isAuthenticated}>{children}</ProtectedRoutes>
      )}
    </>
  );
};

export default AuthWrapper;
