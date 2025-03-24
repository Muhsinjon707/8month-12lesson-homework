// firebase imports
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Redux config..
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slice/loginSlice";

export const useRegister = () => {
  const dispatch = useDispatch();

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const firebaseUser = result.user;

        console.log(firebaseUser);

        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        };

        dispatch(loginUser(userData));
        toast.success("Successfully authenticated");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return { registerWithGoogle };
};
