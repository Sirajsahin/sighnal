// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IgroupDetailsData,
  IgroupListResponse,
} from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useGroupListAPI = () => {
  const [groupList, setGroupList] = useState<IgroupDetailsData[]>([]);
  const execute = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      console.log(accessToken, "accessTokennaccessTokenaccessToken");
      await axios
        .get(USER_LOGIN_APIS.GROUP_LIST_API.baseURL ?? "", {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IgroupListResponse>) => {
          if (res.data.status === true) {
            setGroupList(res.data?.data);
          } else {
            setGroupList([]);
          }
        })
        .catch((e: AxiosError) => {
          setGroupList([]);
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
  return { execute, groupList };
};
