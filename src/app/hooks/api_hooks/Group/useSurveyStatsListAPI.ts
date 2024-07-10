// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IGroupStatsresponse,
  IGroupStatsresponseData,
} from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useSurveyStatsListAPI = () => {
  const [groupStats, setGroupStats] = useState<IGroupStatsresponseData[]>([]);
  const execute = useCallback(async (group_id: string) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(
          `${USER_LOGIN_APIS.GROUP_STATS_API.baseURL}?group_id=${group_id} ` ??
            "",
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        )
        .then((res: AxiosResponse<IGroupStatsresponse>) => {
          if (res.data.status === true) {
            setGroupStats(res.data?.data);
          } else {
            setGroupStats([]);
          }
        })
        .catch((e: AxiosError) => {
          setGroupStats([]);
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
  return { execute, groupStats };
};
