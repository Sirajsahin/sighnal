// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { ISurveyLiveProps } from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useSurveyLiveAPI = () => {
  const execute = useCallback(
    async (paramProps: ISurveyLiveProps, survey_id: string) => {
      try {
        const accessToken = localStorage.getItem("AuthToken");
        const response: InventoryTaxCreateAPIResponse = await axios
          .post(
            `${USER_LOGIN_APIS.SURVEY_LIVE_API.baseURL}${survey_id}`,
            paramProps,
            {
              headers: {
                Authorization: `${accessToken}`,
              },
            }
          )
          .then((res: AxiosResponse<any>) => {
            if (res.data.status === true) {
              toast.success("Survey Live Successful");
              return { status: true, message: res.data?.data?.survey_id };
            } else {
              toast.error("Survey live Faild");
              return { status: false, message: null };
            }
          })
          .catch((e: AxiosError) => {
            if (e.response && e.response.status === 400) {
              const ee = (e.response.data as any).message;
              toast.error(ee);
              return { status: false, message: null };
            }
            if (e.response.status === 400) {
              toast.error("Survey Live Faild");
              return { status: false, message: null };
            }
            if (e.response.status === 500) {
              toast.error("Server error 500");
              return { status: false, message: null };
            }
          });
        return response;
      } catch (e: any) {
        return { status: false, message: null };
        toast.error("Server Error: " + e.message);
      }
    },
    []
  );
  return { execute };
};
