// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { ISurveyCreateResponse } from "@/api_framework/api_modals/group";
import { ICampaignQuestionProps } from "@/components/routes/auth_routes/CreateSurveyStepComponent/AddSurveyQuestionComponent";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useSurveyQuestionCreateAPI = () => {
  const execute = useCallback(async (paramProps: ICampaignQuestionProps[]) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      const response: InventoryTaxCreateAPIResponse = await axios
        .post(USER_LOGIN_APIS.QUESTION_CREATE_API.baseURL ?? "", paramProps, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<ISurveyCreateResponse>) => {
          if (res.data.status === true) {
            toast.success("Question Created Successful");
            return { status: true, message: res.data?.data?.survey_id };
          } else {
            toast.error("Question Created Faild");
            return { status: false, message: null };
          }
        })
        .catch((e: AxiosError) => {
          if (e.code === "ERR_BAD_REQUEST") {
            toast.error("Question Created Faild");
            return { status: false, message: null };
          }
          if (e.response.status === 400) {
            toast.error("Question Created Faild");
            return { status: false, message: null };
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
            return { status: false, message: null };
          }
        });
      return response;
    } catch (e: any) {
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute };
};
