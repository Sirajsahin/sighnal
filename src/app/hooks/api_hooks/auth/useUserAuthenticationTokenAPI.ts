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
import { useOrgListAPI } from "../user/useOrgListAPI";

export const useUserAuthenticationTokenAPI = () => {
  const [logStatus, setLogStatus] = useState<boolean>(false);
  const [businessId, setBusinessId] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { execute: fetchOrgListAPI } = useOrgListAPI();

  const callback = useCallback(
    async (googleOAuthToken: string) => {
      try {
        const response = await axios.post(USER_LOGIN_APIS.LOGIN_API.baseURL, {
          google_id_token: googleOAuthToken,
        });

        if (response.status === 200) {
          fetchOrgListAPI(response?.data?.data?.token);
          if (response?.data?.data?.business_id) {
            localStorage.setItem(
              "business_id",
              response?.data?.data?.business_id
            );

            setBusinessId(true);
          } else {
            setBusinessId(false);
            localStorage.setItem("business_id", null);
          }
          dispatch(setUserValid({ isValid: true }));
          dispatch(
            setAuthorization({
              accessToken: `Bearer ${response.data.data.token}`,
              isValid: true,
            })
          );
          localStorage.setItem(
            "AuthToken",
            `Bearer ${response.data.data.token}`
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
        navigate("/app/login/sign-in");
        toast.error(`Error fetching IAM User: ${error.message}`);
      }
    },
    [dispatch, navigate]
  );

  return { logStatus, callback, businessId };
};
