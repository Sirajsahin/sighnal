// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  ICampaignQuestionDetailsInfo,
  ICampaignQuestionDetailsPreview,
} from "@/components/routes/auth_routes/CreateSurveyStepComponent/AddSurveyQuestionComponent";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useQuestionPreviewAPI = () => {
  const [prevQuestionDetails, setPrevQuestionDetails] = useState<
    ICampaignQuestionDetailsInfo[]
  >([]);
  const execute = useCallback(async (group_id: string, survey_id: string) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(
          `${USER_LOGIN_APIS.SURVEY_PREVIEW_API.baseURL}?group_id=${group_id}&survey_id=${survey_id} `,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        )
        .then((res: AxiosResponse<ICampaignQuestionDetailsPreview>) => {
          if (res.data.status === true) {
            setPrevQuestionDetails(res.data?.data);
          } else {
            setPrevQuestionDetails([]);
          }
        })
        .catch((e: AxiosError) => {
          setPrevQuestionDetails([]);
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
      setPrevQuestionDetails([]);
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, prevQuestionDetails };
};
