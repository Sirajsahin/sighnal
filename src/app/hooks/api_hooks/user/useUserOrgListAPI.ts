// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  ICountryListResponse,
  ICountryListResponseData,
} from "@/api_framework/api_modals/user";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useUserOrgListAPI = () => {
  const [countyList, setCountryList] = useState<ICountryListResponseData[]>([]);
  const execute = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(USER_LOGIN_APIS.USER_ORG_LIST_API.baseURL ?? "", {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<ICountryListResponse>) => {
          if (res.data.data.length > 0 === true) {
            setCountryList(res.data?.data);
          } else {
            setCountryList([]);
          }
        })
        .catch((e: AxiosError) => {
          setCountryList([]);
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
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, countyList };
};
