import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { useAppDispatch } from "@/app_redux/hooks/root_hook";
import {
  setAuthorization,
  setUserValid,
} from "@/app_redux/reducers/slice/auth/auth_reducer";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUserAuthenticationTokenAPI = () => {
  const [logStatus, setLogStatus] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const callback = useCallback(
    async (googleOAuthToken: string) => {
      try {
        const response = await axios.post(USER_LOGIN_APIS.LOGIN_API.baseURL, {
          google_id_token: googleOAuthToken,
        });

        if (response.data?.status) {
          //org lis
          console.log(response, "response");
          localStorage.setItem(
            "AuthToken",
            `Bearer ${response.data.data.token}`
          );
          navigate("/app/login/organization");
          setLogStatus(true);
          dispatch(setUserValid({ isValid: true }));
          dispatch(
            setAuthorization({
              accessToken: `Bearer ${response.data.data.token}`,
              isValid: true,
            })
          );
        } else {
          setLogStatus(false);
        }
      } catch (e) {
        const error = e as AxiosError;

        setLogStatus(false);
        dispatch(setUserValid({ isValid: false }));
        dispatch(
          setAuthorization({
            isValid: false,
            accessToken: null,
          })
        );
        navigate("/app/login/sign-in");
        toast.error(`Error fetching IAM User: ${error.message}`);
      }
    },
    [dispatch, navigate]
  );

  return { logStatus, callback };
};
