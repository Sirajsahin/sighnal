import { FirebaseError, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import envConfig from "./envConfig";
import { useAuthMiddlewares } from "./useAuthMiddlewares";

export const useFirebaseLogin = () => {
  const { validateAccessToken } = useAuthMiddlewares();
  const [accessToken, setAccessToken] = useState<any>(null);
  const navigate = useNavigate();

  const app = initializeApp({ ...envConfig.firebase });
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Signout Method
  const clientSignOut = () => {
    try {
      signOut(auth);
      localStorage.clear();
      sessionStorage.clear();

      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name =
          eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
      navigate("/app/login/sign-in");
      toast.success("Successfully Logged Out");
    } catch {
      navigate("/app/login/sign-in");
      toast.error("Error while logging out");
    }
  };

  const validateAccessTokenAndSignOut = (accessToken: string) => {
    const isValid = validateAccessToken(accessToken);
    if (!isValid) {
      clientSignOut();
    }
  };

  // Sign-in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential?.accessToken || !result?.user) {
        localStorage.clear();
        sessionStorage.clear();
        toast.error("Google authentication error.");
        navigate("/app/login/sign-in");
        return null;
      }

      localStorage.setItem("displayName", result?.user?.displayName);
      localStorage.setItem("email", result?.user?.email);
      localStorage.setItem("photoURL", result?.user?.photoURL);

      setAccessToken(result.user);
      return result.user;
    } catch (error) {
      localStorage.clear();
      sessionStorage.clear();
      const firebaseError = error as FirebaseError;
      toast.error(`Error with login: ${firebaseError.message}`);
      navigate("/app/login/sign-in");
      setAccessToken(null);
      return null;
    }
  };

  return {
    signInWithGoogle,
    accessToken,
    clientSignOut,
    validateAccessTokenAndSignOut,
  };
};
