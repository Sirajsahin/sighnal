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
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useUserCreateAPI = () => {
  const dispatch = useAppDispatch();

  const execute = useCallback(async (paramProps: ISignalUserCreateProps) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      const response: InventoryTaxCreateAPIResponse = await axios
        .post(USER_LOGIN_APIS.CREATE_USER_API.baseURL ?? "", paramProps, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<any>) => {
          if (res.data?.status === true) {
            dispatch(setUserValid({ isValid: true }));
            localStorage.setItem("AuthToken", `Bearer ${res.data.data.token}`);
            localStorage.setItem("displayName", res?.data?.name);
            localStorage.setItem("email", res?.data?.data?.email);
            localStorage.setItem("photoURL", "null");

            dispatch(
              setAuthorization({
                accessToken: `Bearer ${res.data.data.token}`,
                isValid: true,
              })
            );
            return { status: true, message: `Bearer ${res.data.data.token}` };
          } else {
            localStorage.setItem("AuthToken", null);
            dispatch(setUserValid({ isValid: false }));
            dispatch(
              setAuthorization({
                isValid: false,
                accessToken: null,
              })
            );
            return { status: false, message: "" };
          }
        })
        .catch((e: AxiosError) => {
          localStorage.setItem("AuthToken", null);
          dispatch(setUserValid({ isValid: false }));
          dispatch(
            setAuthorization({
              isValid: false,
              accessToken: null,
            })
          );
          const messge = e.response.data as any;
          // if (e.code === "ERR_BAD_REQUEST") {
          //   toast.error(messge.message);
          // }
          if (e.response?.status === 400) {
            console.log(e.response, "ddd");

            toast.error(messge.message);
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
          }
          return { status: false, message: "" };
        });
      return response;
    } catch (e: any) {
      // toast.error(e..message);
      return { status: false, message: "" };
    }
  }, []);
  return { execute };
};
