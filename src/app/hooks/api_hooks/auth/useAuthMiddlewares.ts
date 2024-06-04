import { IDecodedAuthAccessToken } from "@/api_framework/api_modals/FirebaseLogin";
import * as jwt_decode from "jwt-decode";

export const useAuthMiddlewares = () => {
  const validateAccessToken = (accessToken: string): boolean => {
    try {
      const tokenDetails: IDecodedAuthAccessToken = (jwt_decode as any)(
        accessToken
      );
      if (tokenDetails) {
        const expDate = new Date(0);
        const currentDate = new Date(Date.now());
        expDate.setUTCSeconds(tokenDetails.exp);
        if (expDate < currentDate) {
          return false;
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Invalid Login Session :)");
      return false;
    }
  };

  return { validateAccessToken };
};
