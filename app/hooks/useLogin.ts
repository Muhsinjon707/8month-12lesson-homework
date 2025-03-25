import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// toastify
import { toast } from "react-toastify";

// Redux
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slice/loginSlice";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter()
  const dispatch = useDispatch();

  const loginWithEmail = (email: string, password: string) => {
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const firebaseUser = userCredentials.user;

        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || "User",
          photoURL: firebaseUser.photoURL || "",
        };

        dispatch(loginUser(userData));
        toast.success(`Successfully signed in, ${userData.displayName}`);
        router.push("/");
      })
      .catch((error) => toast.error(error.message));
  };

  return { loginWithEmail };
}
