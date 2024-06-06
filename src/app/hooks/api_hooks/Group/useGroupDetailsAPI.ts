// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IgroupDetailsData,
  IgroupDetailsResponse,
} from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useGroupDetailsAPI = () => {
  const [groupDetails, setGroupDetails] = useState<IgroupDetailsData>(null);
  const execute = useCallback(async (business_id: string, group_id: string) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(
          `${USER_LOGIN_APIS.GROUP_DETAILS_API.baseURL}?business_id=${business_id}&group_id=${group_id} ` ??
            "",
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        )
        .then((res: AxiosResponse<IgroupDetailsResponse>) => {
          if (res.data.status === true) {
            setGroupDetails(res.data?.data);
          } else {
            setGroupDetails(null);
          }
        })
        .catch((e: AxiosError) => {
          setGroupDetails(null);
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
  return { execute, groupDetails };
};
