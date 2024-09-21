// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  ISurveyListResponse,
  ISurveyListResponseData,
} from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useSurveyListBygroupAPI = () => {
  const [surveyList, setSurveyList] = useState<ISurveyListResponseData[]>(null);
  const execute = useCallback(async (group_id: string) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(`${USER_LOGIN_APIS.SURVEY_LIST.baseURL}?group_id=${group_id}`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<ISurveyListResponse>) => {
          if (res.data.status === true) {
            setSurveyList(res.data?.data);
          } else {
            setSurveyList([]);
          }
        })
        .catch((e: AxiosError) => {
          setSurveyList([]);
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
      setSurveyList([]);
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, surveyList };
};
