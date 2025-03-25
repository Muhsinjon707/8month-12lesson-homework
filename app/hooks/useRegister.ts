// firebase imports
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Redux config..
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slice/loginSlice";
import { useRouter } from "next/navigation";

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
        toast.success(`Successfully authenticated ${firebaseUser.displayName}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const router = useRouter()
  const registerWithEmail = (
    username: string,
    email: string,
    password: string,
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCreadentials) => {
        const firebaseUser = userCreadentials.user;
        await updateProfile(firebaseUser, {
          displayName: username,
        });

        console.log(firebaseUser);

        const userData = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };

        dispatch(loginUser(userData));
        toast.success(`Welcome. Registered using email and password`);
        router.push("/login");
      })
      .catch((error) => toast.error(error.message));
  };

  return { registerWithGoogle, registerWithEmail };
};
