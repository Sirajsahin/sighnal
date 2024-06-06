import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { ROUTES } from "@/app/routes/routes";
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
  const [businessId, setBusinessId] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const callback = useCallback(
    async (googleOAuthToken: string) => {
      try {
        const response = await axios.post(USER_LOGIN_APIS.LOGIN_API.baseURL, {
          google_id_token: googleOAuthToken,
        });

        if (response.status === 200) {
          if (response?.data?.data?.business_id) {
            setBusinessId(true);
          } else {
            setBusinessId(false);
          }
          dispatch(setUserValid({ isValid: true }));
          dispatch(
            setAuthorization({
              accessToken: `Bearer ${response.data.data.auth_token}`,
              isValid: true,
            })
          );
          localStorage.setItem(
            "AuthToken",
            `Bearer ${response.data.data.auth_token}`
          );
          setLogStatus(true);
        }
      } catch (e) {
        const error = e as AxiosError;
        setBusinessId(false);
        setLogStatus(false);
        dispatch(setUserValid({ isValid: false }));
        dispatch(
          setAuthorization({
            isValid: false,
            accessToken: null,
          })
        );
        navigate(ROUTES.LOGIN_PAGE.url);
        toast.error(`Error fetching IAM User: ${error.message}`);
      }
    },
    [dispatch, navigate]
  );

  return { logStatus, callback, businessId };
};
