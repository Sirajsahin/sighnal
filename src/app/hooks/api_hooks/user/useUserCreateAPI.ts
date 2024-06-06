// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { ISignalUserCreateProps } from "@/api_framework/api_modals/FirebaseLogin";
import { ROUTES } from "@/app/routes/routes";
import { useAppDispatch } from "@/app_redux/hooks/root_hook";
import {
  setAuthorization,
  setUserValid,
} from "@/app_redux/reducers/slice/auth/auth_reducer";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUserCreateAPI = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const execute = useCallback(async (paramProps: ISignalUserCreateProps) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .post(USER_LOGIN_APIS.CREATE_USER_API.baseURL ?? "", paramProps, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<any>) => {
          if (res.data.status === true) {
            dispatch(setUserValid({ isValid: true }));
            localStorage.setItem(
              "AuthToken",
              `Bearer ${res.data.data.auth_token}`
            );
            localStorage.setItem("displayName", res?.data?.data?.name);
            localStorage.setItem("email", res?.data?.data?.email);
            localStorage.setItem(
              "photoURL",
              "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_640.png"
            );

            dispatch(
              setAuthorization({
                accessToken: `Bearer ${res.data.data.auth_token}`,
                isValid: true,
              })
            );
            const token = res.data.data as any;
            localStorage.setItem("AuthToken", `Bearer ${token.auth_token}`);
            navigate("/app/login/onboard");
          } else {
            localStorage.setItem("AuthToken", null);
            dispatch(setUserValid({ isValid: false }));
            dispatch(
              setAuthorization({
                isValid: false,
                accessToken: null,
              })
            );
            navigate("/app/login/sign-in");
          }
        })
        .catch((e: AxiosError) => {
          navigate(ROUTES.LOGIN_PAGE.url);
          localStorage.setItem("AuthToken", null);
          dispatch(setUserValid({ isValid: false }));
          dispatch(
            setAuthorization({
              isValid: false,
              accessToken: null,
            })
          );
          if (e.code === "ERR_BAD_REQUEST") {
            toast.error("Error while fetching org services");
          }
          if (e.status === 400) {
            toast("Services records not found");
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
          }
        });
    } catch (e: any) {
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute };
};
