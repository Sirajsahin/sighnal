// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { ISignalUserCreateProps } from "@/api_framework/api_modals/FirebaseLogin";
import { useAppDispatch } from "@/app_redux/hooks/root_hook";
import {
  setAuthorization,
  setUserValid,
} from "@/app_redux/reducers/slice/auth/auth_reducer";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const useUserCreateAPI = () => {
  const dispatch = useAppDispatch();

  const execute = useCallback(async (paramProps: ISignalUserCreateProps) => {
    try {
      const accessToken = "";
      await axios
        .post(USER_LOGIN_APIS.CREATE_USER_API.baseURL ?? "", paramProps, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<any>) => {
          if (res.data.status === true) {
            dispatch(setUserValid({ isValid: true }));
            dispatch(
              setAuthorization({
                accessToken: `Bearer ${res.data.data.auth_token}`,
                isValid: true,
              })
            );
            const token = res.data.data as any;
            localStorage.setItem("AuthToken", `Bearer ${token.auth_token}`);
          } else {
            dispatch(setUserValid({ isValid: false }));
            dispatch(
              setAuthorization({
                isValid: false,
                accessToken: null,
              })
            );
          }
        })
        .catch((e: AxiosError) => {
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