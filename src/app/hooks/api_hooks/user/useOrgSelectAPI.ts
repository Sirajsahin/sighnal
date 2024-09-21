// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface ISelectResponse {
  message: string;
  data: {
    token: string;
  };
  status: boolean;
}

export const useOrgSelectAPI = () => {
  const navigate = useNavigate();

  const execute = useCallback(async (org_id: string) => {
    try {
      await axios
        .get(`${USER_LOGIN_APIS.SELECT_ORG_API.baseURL}${org_id}`, {
          headers: {
            Authorization: localStorage.getItem("AuthToken"),
          },
        })
        .then((res: AxiosResponse<ISelectResponse>) => {
          if (res.data?.status) {
            navigate("/app/home");
            localStorage.setItem(
              "AuthToken",
              `Bearer ${res.data?.data?.token}`
            );
          } else {
            navigate("/app/login/sign-in");
            localStorage.setItem("AuthToken", null);
          }
        })
        .catch((e: AxiosError) => {
          navigate("/app/login/sign-in");
          localStorage.setItem("AuthToken", null);
          if (e.code === "ERR_BAD_REQUEST") {
            //
          }
          if (e.status === 400) {
            toast.error("User Onboard Faild");
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
          }
        });
    } catch (e: any) {
      navigate("/app/login/sign-in");
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute };
};
