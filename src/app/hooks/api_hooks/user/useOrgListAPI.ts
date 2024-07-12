// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IUserOrgList,
  IUserOrgListResponse,
} from "@/api_framework/api_modals/user";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useOrgListAPI = () => {
  const [orgList, seTorgList] = useState<IUserOrgList[]>([]);
  const navigate = useNavigate();

  const execute = useCallback(async (accessToken: string) => {
    try {
      await axios
        .get(USER_LOGIN_APIS.ORG_LIST_API.baseURL ?? "", {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IUserOrgListResponse>) => {
          if (res.data?.data?.length > 0) {
            seTorgList(res.data?.data);
          } else {
            seTorgList([]);
            navigate("/app/login/onboard");
          }
        })
        .catch((e: AxiosError) => {
          seTorgList([]);
          navigate("/app/login/onboard");
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
      navigate("/app/login/onboard");
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, orgList };
};
