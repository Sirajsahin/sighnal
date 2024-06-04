import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { ROUTES } from "@/app/routes/routes";

import { useAppDispatch } from "@/app_redux/hooks/root_hook";
import {
  setAuthorization,
  setUserValid,
} from "@/app_redux/reducers/slice/auth/auth_reducer";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useUserAuthenticationTokenAPI = () => {
  const [logStatus, setLogStatus] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const callback = useCallback(
    async (googleOAuthToken: string) => {
      try {
        axios
          .post(USER_LOGIN_APIS.LOGIN_API.baseURL, {
            google_id_token: googleOAuthToken,
          })
          .then((res: AxiosResponse<any>) => {
            if (res.status === 200) {
              
              dispatch(setUserValid({ isValid: true }));
              dispatch(
                setAuthorization({
                  accessToken: `Bearer ${res.data.data.auth_token}`,
                  isValid: true,
                })
              );
              const token = res.data.data as any;
              localStorage.setItem("AuthToken", `Bearer ${token.auth_token}`);
              setLogStatus(true);
            }
          })
          .catch((e: AxiosError) => {
            setLogStatus(false);
            dispatch(setUserValid({ isValid: false }));
            dispatch(
              setAuthorization({
                isValid: false,
                accessToken: null,
              })
            );
            navigate(ROUTES.LOGIN_PAGE.url);
            toast.error(`Error fetching IAM User ${e.message}`);
          });
      } catch (e) {
        setLogStatus(false);
        dispatch(setUserValid({ isValid: false }));
        dispatch(
          setAuthorization({
            isValid: false,
            accessToken: null,
          })
        );
        navigate(ROUTES.LOGIN_PAGE.url);
        toast.error("Can't resolve IAM API");
      }
    },
    [dispatch]
  );
  return { logStatus, callback };
};
