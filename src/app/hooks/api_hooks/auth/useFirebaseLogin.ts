import { FirebaseError, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Use 'react-router-dom' for navigation
import envConfig from "./envConfig"; // Ensure the path is correct

import { ROUTES } from "@/app/routes/routes";
import { useAuthMiddlewares } from "./useAuthMiddlewares";

export const useFirebaseLogin = () => {
  const { validateAccessToken } = useAuthMiddlewares();
  const [accessToken, setAccessToken] = useState<any>(null);
  const navigate = useNavigate(); // Hook for navigation

  const app = initializeApp({ ...envConfig.firebase });
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Methods
  //1. Signout Method
  const clientSignOut = () => {
    try {
      signOut(auth);
      try {
        // Clear all local and session storage and cookies
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach(function (cookie) {
          const eqPos = cookie.indexOf("=");
          const name =
            eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });
      } catch {
        // Handle any additional errors
      }
      toast.success("Successfully Logged Out");
    } catch {
      toast.error("Error while logging out");
    }
  };

  const validateAccessTokenAndSignOut = (accessToken: string) => {
    const isValid = validateAccessToken(accessToken);
    if (!isValid) {
      clientSignOut();
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential?.accessToken || !result?.user) {
        toast.error("Google authentication error.");
        window.location.replace(ROUTES.LOGIN_PAGE.url);
        return null;
      }
      const accessToken = result?.user;
      setAccessToken(accessToken);
      return result.user;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast.error(`Error with login: ${firebaseError.message}`);
      navigate(ROUTES.LOGIN_PAGE.url);
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
