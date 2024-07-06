// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { IUserOrgCreateProps } from "@/api_framework/api_modals/user";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useUserOrgCreateAPI = () => {
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
          console.log(res, "res");
          if (res.data.status === true) {
            localStorage.setItem("business_id", res?.data?.data?.business_id);
            toast.success("User Onboard Successful");

            return { status: true, message: "" };
          } else {
            localStorage.setItem("business_id", null);
            toast.error("User Onboard Faild");
            return { status: false, message: "" };
          }
        })
        .catch((e: AxiosError) => {
          localStorage.setItem("business_id", null);
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
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute };
};