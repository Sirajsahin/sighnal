// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { IUserOrgCreateProps } from "@/api_framework/api_modals/user";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useUserOrgCreateAPI = () => {
  const navigate = useNavigate();
  const execute = useCallback(async (paramProps: IUserOrgCreateProps) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      const response: InventoryTaxCreateAPIResponse = await axios
        .post(USER_LOGIN_APIS.USER_ORG_CREATE_API.baseURL ?? "", paramProps, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<any>) => {
          if (res.data.status === true) {
            
            localStorage.setItem(
              "AuthToken",
              `Bearer ${res?.data?.data?.token}`
            );
            toast.success("User Onboard Successful");
            return { status: true, message: "" };
          } else {
            toast.error("User Auth Faild");
            navigate("/app/login/sign-in");
            localStorage.setItem("AuthToken", null);
            toast.error("User Onboard Faild");
            return { status: false, message: "" };
          }
        })
        .catch((e: AxiosError) => {
          toast.error("User Auth Faild");
          navigate("/app/login/sign-in");
          localStorage.setItem("AuthToken", null);
          console.log(e, "res");
          if (e.code === "ERR_BAD_REQUEST") {
            toast.error("User Onboard Faild");
            return { status: false, message: "" };
          }
          if (e.response.status === 400) {
            toast.error("User Onboard Faild");
            return { status: false, message: "" };
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
            return { status: false, message: "" };
          }
        });
      return response;
    } catch (e: any) {
      navigate("/app/login/sign-in");
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute };
};
